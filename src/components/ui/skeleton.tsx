import { cn } from "@/lib/utils/general/cn";

const Skeleton = ({ className, ...props }: React.ComponentProps<"div">) => {
	return (
		<div
			data-slot="skeleton"
			className={cn("animate-pulse rounded-xs bg-neutral-100", className)}
			{...props}
		/>
	);
};

export { Skeleton };
