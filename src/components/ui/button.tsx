import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils/general/cn";

const buttonVariants = cva(
	"cursor-pointer inline-flex items-center justify-center hover:shadow-md gap-2 whitespace-nowrap text-sm font-normal transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-error-600/20 aria-invalid:border-error-600 focus-visible:ring-[1px] focus-visible:ring-offset-2",
	{
		variants: {
			variant: {
				primary:
					"text-white bg-primary-600 hover:bg-primary-500 focus-visible:border-primary-600 focus-visible:ring-primary-600",
				"primary-ghost":
					"text-primary-600 hover:shadow-none hover:text-primary-400 focus-visible:border-primary-600 focus-visible:ring-primary-600",

				dark: "text-white bg-neutral-900 hover:bg-neutral-600 focus-visible:border-neutral-900 focus-visible:ring-neutral-900",
				"dark-ghost":
					"text-neutral-900 hover:shadow-none hover:text-neutral-600 focus-visible:border-neutral-900 focus-visible:ring-neutral-900",

				light:
					"text-neutral-900 bg-neutral-50 text-neutral-900 hover:bg-neutral-100 focus-visible:border-neutral-400 focus-visible:ring-neutral-400",
				"light-ghost":
					"text-neutral-600 hover:shadow-none hover:text-neutral-400 focus-visible:border-neutral-400 focus-visible:ring-neutral-400",

				success:
					"text-white bg-success-600 hover:bg-success-500 focus-visible:border-success-600 focus-visible:ring-success-600",
				"success-ghost":
					"text-success-600 hover:shadow-none hover:text-success-400 focus-visible:border-success-600 focus-visible:ring-success-600",

				warning:
					"text-white bg-warning-600 hover:bg-warning-500 focus-visible:border-warning-600 focus-visible:ring-warning-600",
				"warning-ghost":
					"text-warning-600 hover:shadow-none hover:text-success-400 focus-visible:border-warning-600 focus-visible:ring-warning-600",

				error:
					"text-white bg-error-600 hover:bg-error-500 focus-visible:border-error-600 focus-visible:ring-error-600",
				"error-ghost":
					"text-error-600 hover:shadow-none hover:text-error-400 focus-visible:border-error-600 focus-visible:ring-error-600",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-8  gap-1.5 px-3",
				lg: "h-10 px-6",
				icon: "size-10",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "default",
		},
	}
);

const Button = ({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) => {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
};

export { Button, buttonVariants };
