"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Configure } from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";

import { ALGOLIA_INDEXES, ALGOLIA_SEARCH_QUERY_KEY } from "@/constants/commerce";

import { SearchResultsAttribution } from "@/components/search/results-view/attribution";
import { SearchResultsEmptyBoundary } from "@/components/search/results-view/empty-boundary";
import { SearchResultsEmptyState } from "@/components/search/results-view/empty-state";
import { SearchResultsFiltersContent } from "@/components/search/results-view/filters-content";
import { SearchResultsFiltersMobile } from "@/components/search/results-view/filters-mobile";
import { SearchResultsInfo } from "@/components/search/results-view/info";
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
			<Configure hitsPerPage={12} />
			<SearchResultsQueryInitializer query={query} />

			<div className="pt-10 pb-14">
				<Container>
					<div className="flex gap-6">
						{/* Desktop Filters */}
						<SearchResultsEmptyBoundary fallback={null}>
							<aside className="hidden w-72 shrink-0 bg-teal-300 xl:block">
								<SearchResultsFiltersContent />
							</aside>
						</SearchResultsEmptyBoundary>

						{/* Main Content */}
						<main className="flex-1">
							{/* Results Header */}
							<header className="flex flex-col xl:flex-row">
								{/* Info + Attribution */}
								<div className="flex flex-1 justify-between">
									<div className="bg-amber-200">
										<SearchResultsInfo />
									</div>
									<div className="bg-emerald-300">
										<SearchResultsAttribution />
									</div>
								</div>

								{/* Filters (mobile), Sort, Layout Switch */}
								<SearchResultsEmptyBoundary fallback={null}>
									<div className="flex">
										<aside className="bg-fuchsia-300 xl:hidden">
											<SearchResultsFiltersMobile />
										</aside>
										<div className="bg-error-300 flex flex-1 justify-end">
											<SearchResultsSort />
										</div>
										<div className="bg-green-300">
											<SearchResultsLayoutSwitch />
										</div>
									</div>
								</SearchResultsEmptyBoundary>
							</header>

							{/* Refinements */}
							<SearchResultsEmptyBoundary fallback={null}>
								<section className="bg-indigo-300">
									<SearchResultsRefinements />
								</section>
							</SearchResultsEmptyBoundary>

							{/* Products & Pagination */}
							<section aria-label="Search results" className="bg-pink-300">
								<SearchResultsEmptyBoundary fallback={<SearchResultsEmpty query={query} />}>
									<div>
										<SearchResultsList />
									</div>
									<div>
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
