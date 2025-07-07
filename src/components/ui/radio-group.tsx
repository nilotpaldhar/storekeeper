"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils/general/cn";

const RadioGroup = ({
	className,
	...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) => {
	return (
		<RadioGroupPrimitive.Root
			data-slot="radio-group"
			className={cn("grid gap-3", className)}
			{...props}
		/>
	);
};

const RadioGroupItem = ({
	hideIndicator = false,
	className,
	children,
	...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & { hideIndicator?: boolean }) => {
	return (
		<RadioGroupPrimitive.Item
			data-slot="radio-group-item"
			className={cn(
				"border-input text-primary aspect-square size-4 shrink-0 rounded-full border transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50",
				"focus-visible:ring-primary-600 ring-offset-2 focus-visible:ring-2 focus-visible:outline-none",
				"aria-invalid:ring-error-600 aria-invalid:border-error-600",
				className
			)}
			{...props}
		>
			{children}
			{!hideIndicator ? (
				<RadioGroupPrimitive.Indicator
					data-slot="radio-group-indicator"
					className="relative flex items-center justify-center"
				>
					<CircleIcon className="fill-primary-600 absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
				</RadioGroupPrimitive.Indicator>
			) : null}
		</RadioGroupPrimitive.Item>
	);
};

export { RadioGroup, RadioGroupItem };
