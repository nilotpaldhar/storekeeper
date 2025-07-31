import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils/general/cn";

const FilterBlock = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn("border-b border-neutral-100 pb-6 [&:last-child]:border-transparent", className)}
		{...props}
	/>
);
FilterBlock.displayName = "FilterBlock";

const FilterBlockTitle = ({
	asChild,
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
	asChild?: boolean;
}) => {
	const Comp = asChild ? Slot : "h3";
	return (
		<Comp className={cn("text-base leading-snug font-semibold", className)} {...props}>
			{children}
		</Comp>
	);
};
FilterBlockTitle.displayName = "FilterBlockTitle";

const FilterBlockContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("pt-6", className)} {...props} />
);
FilterBlockContent.displayName = "FilterBlockContent";

export { FilterBlock, FilterBlockTitle, FilterBlockContent };
