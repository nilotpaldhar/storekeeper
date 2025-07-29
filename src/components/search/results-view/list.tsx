"use client";

import type { ProductSummary } from "@/types/domain.types";
import type { ProductCollectionLayout } from "@/types/ui.types";

import { useHits } from "react-instantsearch";

import { ProductCollection } from "@/components/product/collection";

const SearchResultsList = ({ activeLayout }: { activeLayout: ProductCollectionLayout }) => {
	const { items } = useHits<ProductSummary>();

	return <ProductCollection layout={activeLayout} products={items} />;
};

export { SearchResultsList };
