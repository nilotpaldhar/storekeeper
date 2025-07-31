"use client";

import { useEffect, useState } from "react";
import { useRange } from "react-instantsearch";

import {
	FilterBlock,
	FilterBlockTitle,
	FilterBlockContent,
} from "@/components/search/results-view/filters-content/filter-block";
import { Slider } from "@/components/ui/slider";

import { env } from "@/lib/config/env";

const FilterWidgetPrice = ({ title, attribute }: { title: string; attribute: string }) => {
	const { start, range, canRefine, refine } = useRange({ attribute });

	const safeMin = Number.isFinite(range.min) ? (range.min as number) : 0;
	const safeMax = Number.isFinite(range.max) ? (range.max as number) : 0;

	const initialMin = Number.isFinite(start[0]) ? (start[0] as number) : safeMin;
	const initialMax = Number.isFinite(start[1]) ? (start[1] as number) : safeMax;

	const [values, setValues] = useState<[number, number]>([initialMin, initialMax]);

	// Keep values in sync with refinements, but avoid Infinity issues
	useEffect(() => {
		setValues([
			Number.isFinite(start[0]) ? (start[0] as number) : safeMin,
			Number.isFinite(start[1]) ? (start[1] as number) : safeMax,
		]);
	}, [start, safeMin, safeMax]);

	const handleChange = (newValues: number[]) => {
		setValues([newValues[0], newValues[1]]);
	};

	const handleCommit = (newValues: number[]) => {
		refine([newValues[0], newValues[1]]);
	};

	// Currency formatter
	const formatPrice = (price: number) =>
		new Intl.NumberFormat("en-US", {
			style: "currency",
			maximumFractionDigits: 0,
			currency: env.NEXT_PUBLIC_COMMERCE_LAYER_CURRENCY_CODE,
		}).format(price);

	return (
		<FilterBlock>
			<FilterBlockTitle>{title}</FilterBlockTitle>
			<FilterBlockContent>
				<div className="flex flex-col space-y-4">
					<Slider
						min={safeMin}
						max={safeMax}
						step={1}
						value={values}
						disabled={!canRefine}
						onValueChange={handleChange}
						onValueCommit={handleCommit}
					/>
					<div className="flex justify-between text-sm">
						<span>{formatPrice(values[0])}</span>
						<span>{formatPrice(values[1])}</span>
					</div>
				</div>
			</FilterBlockContent>
		</FilterBlock>
	);
};

export { FilterWidgetPrice };
