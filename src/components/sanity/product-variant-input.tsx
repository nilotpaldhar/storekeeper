"use client";

import { Select } from "@sanity/ui";
import { useEffect, useState } from "react";
import { useFormValue, type StringInputProps, type StringSchemaType } from "sanity";

type ProductOption = {
	name: string;
	values: string[];
};

type ProductDocument = {
	options?: ProductOption[];
};

const generateCombinations = (optionGroups: string[][]): string[][] => {
	if (optionGroups.length === 0) return [[]];
	const [first, ...rest] = optionGroups;
	const restCombos = generateCombinations(rest);
	return first.flatMap((val) => restCombos.map((combo) => [val, ...combo]));
};

const formatVariants = (optionCombos: string[][]): string[] => {
	return optionCombos.map((combo) => combo.join(" - "));
};

const ProductVariantInput = ({
	value,
	readOnly,
	elementProps,
}: StringInputProps<StringSchemaType>) => {
	const parentDoc = useFormValue([]) as ProductDocument;
	const [options, setOptions] = useState<string[]>([]);

	useEffect(() => {
		const combos = generateCombinations((parentDoc.options || []).map((opt) => opt.values || []));
		const formatted = formatVariants(combos);
		setOptions(formatted);
	}, [parentDoc]);

	return (
		<Select value={value || ""} disabled={readOnly} {...elementProps}>
			<option value="">-- Select a variant --</option>
			{options.map((opt) => (
				<option key={opt} value={opt}>
					{opt}
				</option>
			))}
		</Select>
	);
};

export { ProductVariantInput };
