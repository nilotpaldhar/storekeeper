import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils/general/cn";

const Block = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("flex flex-col space-y-3", className)} {...props} />
);
Block.displayName = "Block";

const BlockTitle = ({
	asChild,
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
	asChild?: boolean;
}) => {
	const Comp = asChild ? Slot : "h2";
	return (
		<Comp className={cn("text-sm leading-none font-bold uppercase", className)} {...props}>
			{children}
		</Comp>
	);
};
BlockTitle.displayName = "BlockTitle";

const BlockContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={className} {...props} />
);
BlockContent.displayName = "BlockContent";

export { Block, BlockTitle, BlockContent };
