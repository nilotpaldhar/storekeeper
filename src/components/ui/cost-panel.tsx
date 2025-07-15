import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils/general/cn";

const CostPanel = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
	<aside className={cn("border border-dashed border-neutral-200", className)} {...props} />
);
CostPanel.displayName = "CostPanel";

const CostPanelHeader = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
	<header
		className={cn("border-b border-dashed border-neutral-200 px-5 py-3", className)}
		{...props}
	/>
);
CostPanelHeader.displayName = "CostPanelHeader";

const CostPanelFooter = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
	<footer
		className={cn("border-t border-dashed border-neutral-200 px-5 py-3", className)}
		{...props}
	/>
);
CostPanelFooter.displayName = "CostPanelFooter";

const CostPanelTitle = ({
	asChild,
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
	asChild?: boolean;
}) => {
	const Comp = asChild ? Slot : "h1";
	return (
		<Comp className={cn("text-sm font-bold", className)} {...props}>
			{children}
		</Comp>
	);
};
CostPanelTitle.displayName = "CostPanelTitle";

const CostPanelContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("", className)} {...props} />
);
CostPanelContent.displayName = "CostPanelContent";

const CostPanelBlock = ({
	hideDivider = false,
	className,
	...props
}: React.HTMLAttributes<HTMLElement> & {
	hideDivider?: boolean;
}) => (
	<section
		className={cn("p-5", !hideDivider && "border-b border-dashed border-neutral-200", className)}
		{...props}
	/>
);
CostPanelBlock.displayName = "CostPanelBlock";

const CostPanelPriceRow = ({
	label,
	value,
	className,
}: {
	label: React.ReactNode;
	value: React.ReactNode;
	className?: string;
}) => (
	<div className={cn("flex items-center justify-between gap-2 text-sm font-normal", className)}>
		<dt>{label}</dt>
		<dd>{value}</dd>
	</div>
);
CostPanelPriceRow.displayName = "CostPanelPriceRow";

export {
	CostPanel,
	CostPanelHeader,
	CostPanelFooter,
	CostPanelTitle,
	CostPanelContent,
	CostPanelBlock,
	CostPanelPriceRow,
};
