"use client";

import type { ProductOption } from "@/types/domain.types";

import React from "react";

import { Block, BlockTitle, BlockContent } from "@/components/ui/block";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils/general/cn";

type ProductOptionBlockProps = {
	option: ProductOption;
	selectedValue: string;
	disabled?: boolean;
	onChange: (value: string) => void;
};

const OptionBlock = React.memo(function OptionBlock({
	option,
	selectedValue,
	disabled = false,
	onChange,
}: ProductOptionBlockProps) {
	return (
		<Block key={option.refKey} className="flex flex-row items-center space-y-0 space-x-6">
			<BlockTitle className="w-28">{option.name}</BlockTitle>
			<BlockContent>
				{option.values.length > 0 ? (
					<RadioGroup
						defaultValue={selectedValue}
						onValueChange={onChange}
						orientation="horizontal"
						className="flex flex-wrap items-center gap-2"
						disabled={disabled}
					>
						{option.values.map((value) => (
							<RadioGroupItem
								key={value}
								id={value}
								value={value}
								hideIndicator
								className={cn(
									"aspect-auto size-auto cursor-pointer rounded-xs border px-2 py-1 select-none",
									selectedValue === value
										? "border-primary-600 text-primary-600"
										: "border-neutral-200 text-neutral-500"
								)}
							>
								<span className="text-xs leading-none font-normal">{value}</span>
							</RadioGroupItem>
						))}
					</RadioGroup>
				) : null}
			</BlockContent>
		</Block>
	);
});

export { OptionBlock };
