"use client";

import { useRefinementList } from "react-instantsearch";

import {
	FilterBlock,
	FilterBlockTitle,
	FilterBlockContent,
} from "@/components/search/results-view/filters-content/filter-block";
import { FilterSkeleton } from "@/components/search/results-view/filters-content/filter-skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils/general/cn";

type FilterItemProps = {
	id: string;
	value: string;
	label: string;
	isActive?: boolean;
	onChange: (value: string) => void;
};

const FilterItem = ({ id, label, value, isActive, onChange }: FilterItemProps) => {
	return (
		<div className="flex items-center gap-3">
			<Checkbox id={id} checked={isActive} onCheckedChange={() => onChange(value)} />
			<Label
				htmlFor={id}
				className={cn("cursor-pointer text-sm", isActive && "text-primary-600 font-medium")}
			>
				{label}
			</Label>
		</div>
	);
};

type FilterWidgetFacetProps = {
	attribute: string;
	title: string;
};

const FilterWidgetFacet = ({ title, attribute }: FilterWidgetFacetProps) => {
	const { items, refine, hasExhaustiveItems } = useRefinementList({ attribute });

	if (!hasExhaustiveItems && items.length === 0) return null;

	return (
		<FilterBlock>
			{hasExhaustiveItems && items.length === 0 ? (
				<FilterSkeleton />
			) : (
				<>
					<FilterBlockTitle>{title}</FilterBlockTitle>
					<FilterBlockContent>
						<ul className="flex flex-col space-y-3">
							{items.map(({ label, value, isRefined }) => (
								<li key={label}>
									<FilterItem
										id={`${attribute}-${value}`}
										value={value}
										label={label}
										isActive={isRefined}
										onChange={refine}
									/>
								</li>
							))}
						</ul>
					</FilterBlockContent>
				</>
			)}
		</FilterBlock>
	);
};

export { FilterWidgetFacet };
