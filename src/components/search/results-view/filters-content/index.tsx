"use client";

import { ALGOLIA_FACET_ATTRIBUTES } from "@/constants/commerce";

import {
	FilterCategoryWidget,
	FilterWidgetFacet,
	FilterWidgetPrice,
} from "@/components/search/results-view/filters-content/filter-widgets";
import { FiltersHeader } from "@/components/search/results-view/filters-content/header";

type SearchResultsFiltersContentProps = {
	headerTitle?: string;
	widgetTitles?: {
		category?: string;
		brand?: string;
		price?: string;
	};
};

const SearchResultsFiltersContent = ({
	headerTitle,
	widgetTitles = {
		category: "Category",
		brand: "Brand",
		price: "Price",
	},
}: SearchResultsFiltersContentProps) => {
	return (
		<div>
			<FiltersHeader title={headerTitle} />
			<div className="flex flex-col space-y-6 py-6">
				<FilterCategoryWidget
					title={widgetTitles.category ?? "Category"}
					attributes={{
						taxonomy: ALGOLIA_FACET_ATTRIBUTES.TAXONOMY,
						taxon: ALGOLIA_FACET_ATTRIBUTES.TAXON,
					}}
				/>
				<FilterWidgetFacet
					title={widgetTitles.brand ?? "Brand"}
					attribute={ALGOLIA_FACET_ATTRIBUTES.BRAND}
				/>
				<FilterWidgetPrice
					title={widgetTitles.price ?? "Price"}
					attribute={ALGOLIA_FACET_ATTRIBUTES.PRICE}
				/>
			</div>
		</div>
	);
};

export { SearchResultsFiltersContent };
