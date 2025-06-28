"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils/general/cn";

const Checkbox = ({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) => {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(
				"peer data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600 border-input size-5 shrink-0 cursor-pointer border-2 shadow-xs transition-shadow outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:text-white",
				"focus-visible:ring-primary-600 ring-offset-2 focus-visible:ring-2 focus-visible:outline-none",
				"aria-invalid:ring-error-600 aria-invalid:border-error-600",
				className
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="flex items-center justify-center text-current transition-none"
			>
				<CheckIcon className="size-3.5" />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
};

export { Checkbox };
