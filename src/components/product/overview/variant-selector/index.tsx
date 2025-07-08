"use client";

import type { ProductOption, ProductVariant } from "@/types/domain.types";

import { useCallback, useEffect, useState } from "react";

import { OptionBlock } from "@/components/product/overview/variant-selector/option-block";

type VariantSelectorProps = {
	options: ProductOption[];
	variants: ProductVariant[];
	disabled?: boolean;
	onVariantChange: (variant: ProductVariant | null) => void;
};

const VariantSelector = ({
	options,
	variants,
	disabled,
	onVariantChange,
}: VariantSelectorProps) => {
	const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

	const handleChange = useCallback(({ name, value }: { name: string; value: string }) => {
		setSelectedOptions((prev) => ({ ...prev, [name]: value }));
	}, []);

	useEffect(() => {
		const defaults: Record<string, string> = {};
		options.forEach((opt) => {
			defaults[opt.name] = opt.values[0];
		});
		setSelectedOptions(defaults);
	}, [options]);

	useEffect(() => {
		if (Object.keys(selectedOptions).length === 0) return;

		const variantKey = options.map((opt) => selectedOptions[opt.name]).join(" - ");
		const variant = variants.find((v) => v.variantKey === variantKey);
		onVariantChange(variant ?? null);
	}, [onVariantChange, options, selectedOptions, variants]);

	return (
		<div className="flex flex-col space-y-6">
			{options.map((option) => (
				<OptionBlock
					key={option.refKey}
					option={option}
					selectedValue={selectedOptions[option.name]}
					disabled={disabled}
					onChange={(value) => handleChange({ name: option.name, value })}
				/>
			))}
		</div>
	);
};

export { VariantSelector };
