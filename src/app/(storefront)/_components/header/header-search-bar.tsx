"use client";

import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";
import { createLocalStorageRecentSearchesPlugin } from "@algolia/autocomplete-plugin-recent-searches";
import { ArrowUpLeft, SearchIcon, Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { useLazyRef } from "@/hooks/common/use-lazy-ref";

import {
	ALGOLIA_RECENT_SEARCHES_KEY,
	ALGOLIA_INDEXES,
	ALGOLIA_SEARCH_QUERY_KEY,
} from "@/constants/commerce";

import {
	AutoComplete,
	AutoCompleteItem,
	AutoCompleteItemAction,
} from "@/components/search/autocomplete";

import { searchClient } from "@/lib/clients/algolia/search";
import { cn } from "@/lib/utils/general/cn";

type HeaderSearchBarProps = {
	className?: string;
};

const HeaderSearchBar = ({ className }: HeaderSearchBarProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const query = searchParams.get(ALGOLIA_SEARCH_QUERY_KEY) ?? "";

	const createSearchUrl = (query: string) => {
		const params = new URLSearchParams({ [ALGOLIA_SEARCH_QUERY_KEY]: query });
		return `/search?${params.toString()}`;
	};

	const getRecentSearches = useLazyRef(() =>
		createLocalStorageRecentSearchesPlugin({
			key: ALGOLIA_RECENT_SEARCHES_KEY,
			limit: 10,
			transformSource: ({ source, onRemove, onTapAhead }) => ({
				...source,
				templates: {
					item: ({ item, components }) => (
						<AutoCompleteItem
							label={item.label}
							icon={SearchIcon}
							onClick={() => {
								onTapAhead(item);
								router.push(createSearchUrl(item.label));
							}}
							classNames={{ actionsContainer: "flex items-center space-x-2" }}
							actions={
								<>
									<AutoCompleteItemAction
										icon={Trash}
										label="Remove this search"
										onClick={(event) => {
											event.preventDefault();
											event.stopPropagation();
											onRemove(item.label);
										}}
									/>
									<AutoCompleteItemAction
										icon={ArrowUpLeft}
										label={`Fill query with "${item.label}"`}
										onClick={(event) => {
											event.preventDefault();
											event.stopPropagation();
											onTapAhead(item);
										}}
									/>
								</>
							}
						>
							<components.ReverseHighlight hit={item} attribute="label" />
						</AutoCompleteItem>
					),
				},
			}),
		})
	);

	const getQuerySuggestions = useLazyRef(() =>
		createQuerySuggestionsPlugin({
			searchClient,
			indexName: ALGOLIA_INDEXES.PRODUCTS_QUERY_SUGGESTION,
			transformSource: ({ source, onTapAhead }) => ({
				...source,
				getItemUrl: ({ item }) => createSearchUrl(item.query),
				templates: {
					...source.templates,
					item: ({ item, components }) => (
						<AutoCompleteItem
							label={item.query}
							icon={SearchIcon}
							onClick={() => {
								onTapAhead(item);
								router.push(createSearchUrl(item.query));
							}}
							actions={
								<AutoCompleteItemAction
									icon={ArrowUpLeft}
									label={`Fill query with "${item.label}"`}
									onClick={() => onTapAhead(item)}
								/>
							}
						>
							<components.ReverseHighlight hit={item} attribute="query" />
						</AutoCompleteItem>
					),
				},
			}),
		})
	);

	return (
		<div className={cn("flex w-max items-center lg:w-full lg:max-w-md 2xl:max-w-sm", className)}>
			<AutoComplete
				initialQuery={query}
				detachedMediaQuery="(max-width: 992px)"
				placeholder="Search for products, brands and more"
				classNames={{
					container:
						"flex items-center w-full h-full bg-transparent transition-colors duration-300 lg:h-10 lg:bg-neutral-50 lg:border lg:border-transparent lg:focus-within:border-neutral-100 lg:focus-within:bg-transparent",
					root: "flex items-center w-full h-full",
					form: "flex w-full lg:px-3",
					input:
						"search-clear-hidden block w-full bg-transparent text-sm text-neutral-900 font-normal placeholder:text-neutral-400 placeholder:font-light outline-none",
					inputWrapper: "flex items-center flex-1",
					inputWrapperPrefix: "flex items-center mr-2",
					label: "flex items-center",
					submitButton:
						"cursor-pointer text-neutral-400 hover:text-neutral-900 transition-colors duration-300 [&>svg]:w-5 [&>svg]:h-5",
					inputWrapperSuffix: "hidden lg:flex lg:items-center lg:ml-2",
					clearButton:
						"cursor-pointer text-neutral-400 hover:text-neutral-900 transition-colors duration-300 [&>svg]:w-5 [&>svg]:h-5",
					detachedOverlay: "relative z-[9999]",
					detachedContainer:
						"fixed inset-0 flex flex-col divide-y divide-neutral-100 font-[nunito]",
					detachedFormContainer: "flex bg-white h-20 px-5",
					detachedSearchButton:
						"flex items-center h-full text-neutral-900 hover:text-current focus-visible:text-primary-600 focus-visible:outline-primary-600",
					detachedSearchButtonIcon: "-translate-y-px [&>svg]:w-5 [&>svg]:h-5",
					detachedSearchButtonPlaceholder: "sr-only",
					detachedSearchButtonQuery: "sr-only",
					detachedCancelButton: "font-semibold text-neutral-900 hover:text-current ml-2",
					panel: "flex-1 bg-white z-[1020] lg:absolute lg:ring-1 lg:ring-neutral-100 lg:mt-px",
				}}
				plugins={[getRecentSearches(), getQuerySuggestions()]}
				onNavigate={({ itemUrl }) => router.push(itemUrl)}
				onSubmit={({ query }) => router.push(createSearchUrl(query))}
			/>
		</div>
	);
};

export { HeaderSearchBar };
