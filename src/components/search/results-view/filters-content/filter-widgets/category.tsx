"use client";

import { useRefinementList } from "react-instantsearch";

import {
	FilterBlock,
	FilterBlockTitle,
	FilterBlockContent,
} from "@/components/search/results-view/filters-content/filter-block";
import { FilterSkeleton } from "@/components/search/results-view/filters-content/filter-skeleton";

import { cn } from "@/lib/utils/general/cn";
import { mergeRefinementItems, RefinementItem } from "@/lib/utils/search/merge-refinement-items";

type FilterItemProps = {
	id: string;
	value: string;
	label: string;
	count: number;
	isActive?: boolean;
	onChange: (value: string) => void;
};

const FilterItem = ({ id, label, value, isActive, count, onChange }: FilterItemProps) => {
	return (
		<div className="flex items-center justify-between space-x-1">
			<label
				htmlFor={id}
				className={cn(
					"flex-1 cursor-pointer text-neutral-900 transition-colors duration-300",
					isActive && "text-primary-600"
				)}
			>
				<input
					id={id}
					type="checkbox"
					value={value}
					checked={isActive}
					onChange={() => onChange(value)}
					className="peer sr-only"
				/>
				<span
					className={cn(
						"block text-sm font-normal text-current peer-focus-visible:outline-1 peer-focus-visible:outline-neutral-600 peer-focus-visible:outline-dashed",
						isActive && "peer-focus-visible:outline-primary-600"
					)}
				>
					{label}
				</span>
			</label>
			<div
				className={cn(
					"flex h-5 w-5 items-center justify-center bg-neutral-50 text-neutral-900 transition-colors duration-300",
					isActive && "bg-primary-600 text-white"
				)}
			>
				<span className="block text-xs leading-none font-normal">{count}</span>
			</div>
		</div>
	);
};

type FilterCategoryWidgetProps = {
	attributes: {
		taxonomy: string;
		taxon: string;
	};
	title: string;
};

const FilterCategoryWidget = ({ title, attributes }: FilterCategoryWidgetProps) => {
	// Get refinement list hooks for both attributes
	const taxonomyList = useRefinementList({ attribute: attributes.taxonomy });
	const taxonList = useRefinementList({ attribute: attributes.taxon });

	const { hasExhaustiveItems: taxonomyLoaded } = taxonomyList;
	const { hasExhaustiveItems: taxonLoaded } = taxonList;

	// Merge results into a unified list while keeping track of their original attribute
	const mergedItems: RefinementItem[] = mergeRefinementItems(
		taxonomyList.items as RefinementItem[],
		taxonList.items as RefinementItem[]
	);

	// Handle refinement by calling the correct attribute's refine function
	const handleRefine = ({ attribute, value }: { attribute: string; value: string }) => {
		if (attribute === "taxonomy") {
			taxonomyList.refine(value);
		} else {
			taxonList.refine(value);
		}
	};

	// If both lists are empty AND not loaded yet -> nothing to render yet
	if (
		!taxonomyLoaded &&
		taxonomyList.items.length === 0 &&
		!taxonLoaded &&
		taxonList.items.length === 0
	) {
		return null;
	}

	// If either list is still loading → show skeleton
	if (
		(taxonomyLoaded && taxonomyList.items.length === 0) ||
		(taxonLoaded && taxonList.items.length === 0)
	) {
		return (
			<FilterBlock>
				<FilterSkeleton />
			</FilterBlock>
		);
	}

	return (
		<FilterBlock>
			<FilterBlockTitle>{title}</FilterBlockTitle>
			<FilterBlockContent>
				<ul className="flex flex-col space-y-3">
					{mergedItems.map(({ attribute, label, value, count, isRefined }) => (
						<li key={`${attribute}-${value}`}>
							<FilterItem
								id={`category-${attribute}-${value}`}
								value={value}
								label={label}
								count={count}
								isActive={isRefined}
								onChange={() =>
									handleRefine({
										attribute,
										value,
									})
								}
							/>
						</li>
					))}
				</ul>
			</FilterBlockContent>
		</FilterBlock>
	);
};

export { FilterCategoryWidget };
