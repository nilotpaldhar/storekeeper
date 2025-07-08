import { StarFill } from "@/components/icons/common";

import { cn } from "@/lib/utils/general/cn";

const RatingSummary = ({
	compact = false,
	className,
}: {
	compact?: boolean;
	className?: string;
}) => {
	return (
		<div
			className={cn(
				"flex items-center space-x-2.5 border border-neutral-200 px-3 py-1.5 text-sm leading-none",
				className
			)}
		>
			<div className="flex items-center space-x-1">
				<span className="inline-block font-bold">4.2</span>
				<span className="size-3">
					<StarFill className="fill-yellow-400" />
				</span>
			</div>
			<span role="separator" className="h-4 w-px bg-neutral-200" />
			<div className="flex items-center space-x-1 font-normal">
				<span>47k</span>
				{!compact ? <span> Ratings</span> : null}
			</div>
		</div>
	);
};

export { RatingSummary };
