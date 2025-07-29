"use client";

import type { ProductSummary } from "@/types/domain.types";
import type { ProductCollectionLayout } from "@/types/ui.types";

import { useHits, useInstantSearch } from "react-instantsearch";

import { ProductCollection } from "@/components/product/collection";
import { SearchResultsListSkeleton } from "@/components/search/results-view/list-skeleton";

const SearchResultsList = ({ activeLayout }: { activeLayout: ProductCollectionLayout }) => {
	const { items } = useHits<ProductSummary>();
	const { status } = useInstantSearch();

	if (status === "loading" || status === "stalled") {
		return <SearchResultsListSkeleton layout={activeLayout} />;
	}

	return <ProductCollection layout={activeLayout} products={items} />;
};

export { SearchResultsList };
