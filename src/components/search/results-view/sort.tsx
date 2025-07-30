"use client";

import { useSortBy } from "react-instantsearch";

import { ALGOLIA_INDEXES } from "@/constants/commerce";

import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";

const SearchResultsSort = () => {
	const { options, refine, currentRefinement } = useSortBy({
		items: [
			{ label: "Sort by Relevance", value: ALGOLIA_INDEXES.PRODUCTS },
			{ label: "Sort by Lowest Price", value: ALGOLIA_INDEXES.PRODUCTS_PRICE_ASC },
			{ label: "Sort by Highest Price", value: ALGOLIA_INDEXES.PRODUCTS_PRICE_DESC },
		],
	});

	return (
		<Select value={currentRefinement} onValueChange={(value) => refine(value)}>
			<SelectTrigger className="w-[200px]">
				<SelectValue placeholder="Sort by" />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export { SearchResultsSort };
