import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils/general/cn";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
	asChild?: boolean;
};

const ProductCollectionHeading = ({ asChild, className, children, ...props }: HeadingProps) => {
	const Comp = asChild ? Slot : "h2";
	return (
		<Comp
			className={cn(
				"text-lg leading-tight font-semibold text-neutral-900 capitalize md:text-lg",
				className
			)}
			{...props}
		>
			{children}
		</Comp>
	);
};

export { ProductCollectionHeading };
