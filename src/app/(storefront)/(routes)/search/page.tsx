import type { Metadata } from "next";

import { Suspense } from "react";

import { ALGOLIA_SEARCH_QUERY_KEY } from "@/constants/commerce";

import { SearchResultsView } from "@/components/search/results-view";

import { getSeo } from "@/lib/resources/seo/services";

type SearchPageProps = {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const generateMetadata = async ({ searchParams }: SearchPageProps): Promise<Metadata> => {
	const query = (await searchParams)[ALGOLIA_SEARCH_QUERY_KEY];
	const title = query ? `"${query}" - Search Results` : `Search Results`;
	return getSeo({ metaTitle: title, shareTitle: title });
};

const SearchPage = async (_props: SearchPageProps) => {
	return (
		<Suspense>
			<SearchResultsView />
		</Suspense>
	);
};

export default SearchPage;
