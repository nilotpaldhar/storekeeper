import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/general/cn";

const dividerVariants = cva(
	"relative flex items-center before:absolute before:top-1/2 before:right-0 before:left-0 before:border-neutral-500 before:border-t",
	{
		variants: {
			type: {
				dashed: "before:border-dashed",
				solid: "before:border-solid",
				dotted: "before:border-dotted",
			},
			textAlign: {
				left: "justify-start text-left",
				center: "justify-center text-center",
				right: "justify-end text-right",
			},
		},
		defaultVariants: {
			type: "dashed",
			textAlign: "center",
		},
	}
);

const textVariants = cva("relative z-10 leading-none bg-white", {
	variants: {
		textAlign: {
			left: "text-left pr-3",
			center: "text-center px-3",
			right: "text-right pl-3",
		},
	},
	defaultVariants: {
		textAlign: "center",
	},
});

type DividerProps = React.ComponentProps<"div"> & VariantProps<typeof dividerVariants>;

const Divider = ({ textAlign, type, className, children, ...props }: DividerProps) => (
	<div className={cn(dividerVariants({ textAlign, type, className }))} role="separator" {...props}>
		{children ? <span className={cn(textVariants({ textAlign }))}>{children}</span> : null}
	</div>
);

export { Divider };
