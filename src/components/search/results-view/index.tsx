"use client";

import type { ProductCollectionLayout } from "@/types/ui.types";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Configure } from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";

import {
	ALGOLIA_INDEXES,
	ALGOLIA_SEARCH_QUERY_KEY,
	SEARCH_RESULTS_PER_PAGE,
} from "@/constants/commerce";

import { SearchResultsAttribution } from "@/components/search/results-view/attribution";
import { SearchResultsEmptyBoundary } from "@/components/search/results-view/empty-boundary";
import { SearchResultsEmptyState } from "@/components/search/results-view/empty-state";
import { SearchResultsFiltersContent } from "@/components/search/results-view/filters-content";
import { SearchResultsFiltersMobile } from "@/components/search/results-view/filters-mobile";
import { SearchResultsLayoutSwitch } from "@/components/search/results-view/layout-switch";
import { SearchResultsList } from "@/components/search/results-view/list";
import { SearchResultsPagination } from "@/components/search/results-view/pagination";
import { SearchResultsQueryInitializer } from "@/components/search/results-view/query-initializer";
import { SearchResultsRefinements } from "@/components/search/results-view/refinements";
import { SearchResultsSort } from "@/components/search/results-view/sort";
import { Container } from "@/components/ui/container";
import { ThreeDotsLoader } from "@/components/ui/loader";

import { searchClient } from "@/lib/clients/algolia/search";

const SearchResultsStateWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="flex min-h-[80vh] items-center justify-center py-5">
			<Container className="flex justify-center">{children}</Container>
		</main>
	);
};

const SearchResultsEmpty = ({ query }: { query: string }) => {
	return (
		<SearchResultsStateWrapper>
			<SearchResultsEmptyState
				title={`No results found for “${query}”`}
				description="We couldn't find any products matching your search. Try a different keyword or remove some filters."
				imageAlt="Illustration showing no search results"
				examples={[]}
			/>
		</SearchResultsStateWrapper>
	);
};

const SearchResultsView = () => {
	const [isMounted, setIsMounted] = useState(false);
	const [activeLayout, setActiveLayout] = useState<ProductCollectionLayout>("grid");

	const searchParams = useSearchParams();
	const query = searchParams.get(ALGOLIA_SEARCH_QUERY_KEY) ?? "";

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return (
			<SearchResultsStateWrapper>
				<ThreeDotsLoader />
			</SearchResultsStateWrapper>
		);
	}

	if (!query) {
		return (
			<SearchResultsStateWrapper>
				<SearchResultsEmptyState
					title="No search term entered"
					description="Start by typing in the search bar to explore our products."
					imageAlt="Start Searching"
					examples={["headphones", "laptops"]}
				/>
			</SearchResultsStateWrapper>
		);
	}

	return (
		<InstantSearchNext
			key={query}
			searchClient={searchClient}
			indexName={ALGOLIA_INDEXES.PRODUCTS}
			future={{ preserveSharedStateOnUnmount: true }}
			routing
		>
			<Configure hitsPerPage={SEARCH_RESULTS_PER_PAGE} />
			<SearchResultsQueryInitializer query={query} />

			<div className="min-h-screen pt-10 pb-14">
				<Container>
					<div className="flex gap-6">
						{/* Desktop Filters */}
						<SearchResultsEmptyBoundary fallback={null}>
							<aside className="hidden w-72 shrink-0 xl:block">
								<SearchResultsFiltersContent />
							</aside>
						</SearchResultsEmptyBoundary>

						{/* Main Content */}
						<main className="flex-1">
							{/* Results Header */}
							<header className="flex flex-col pb-6 xl:flex-row">
								{/* Info + Attribution */}
								<div className="flex flex-1 items-center justify-between">
									<div className="flex flex-wrap gap-1">
										<span>Showing results for</span>
										<strong>&quot;{query}&quot;</strong>
									</div>
									<div className="flex items-center">
										<SearchResultsAttribution />
									</div>
								</div>

								{/* Filters (mobile), Sort, Layout Switch */}
								<SearchResultsEmptyBoundary fallback={null}>
									<div className="flex items-center pt-6 xl:pt-0">
										<aside className="bg-fuchsia-300 xl:hidden">
											<SearchResultsFiltersMobile />
										</aside>
										<div className="flex flex-1 justify-end sm:px-6">
											<SearchResultsSort />
										</div>
										<div className="hidden sm:block">
											<SearchResultsLayoutSwitch
												activeLayout={activeLayout}
												onChange={setActiveLayout}
											/>
										</div>
									</div>
								</SearchResultsEmptyBoundary>
							</header>

							{/* Refinements */}
							<SearchResultsEmptyBoundary fallback={null}>
								<section className="hidden bg-indigo-300">
									<SearchResultsRefinements />
								</section>
							</SearchResultsEmptyBoundary>

							{/* Products & Pagination */}
							<section aria-label="Search results">
								<SearchResultsEmptyBoundary fallback={<SearchResultsEmpty query={query} />}>
									<SearchResultsList activeLayout={activeLayout} />
									<div className="flex items-center justify-center pt-14">
										<SearchResultsPagination />
									</div>
								</SearchResultsEmptyBoundary>
							</section>
						</main>
					</div>
				</Container>
			</div>
		</InstantSearchNext>
	);
};

export { SearchResultsView };
