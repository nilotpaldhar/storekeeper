import { ImageIcon } from "lucide-react";

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

const SkeletonImage = ({ className, ...props }: React.ComponentProps<"div">) => {
	return (
		<div
			data-slot="skeleton"
			className={cn(
				"flex aspect-square animate-pulse items-center justify-center bg-neutral-100",
				className
			)}
			{...props}
		>
			<ImageIcon size={32} className="text-neutral-300" />
		</div>
	);
};

export { Skeleton, SkeletonImage };
