"use client";

import { useRefinementList } from "react-instantsearch";

import {
	FilterBlock,
	FilterBlockTitle,
	FilterBlockContent,
} from "@/components/search/results-view/filters-content/filter-block";
import { FilterSkeleton } from "@/components/search/results-view/filters-content/filter-skeleton";

import { cn } from "@/lib/utils/general/cn";

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
	attribute: string;
	title: string;
};

const FilterCategoryWidget = ({ title, attribute }: FilterCategoryWidgetProps) => {
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
							{items.map(({ label, value, count, isRefined }) => (
								<li key={label}>
									<FilterItem
										id={`${attribute}-${value}`}
										value={value}
										label={label}
										count={count}
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

export { FilterCategoryWidget };
