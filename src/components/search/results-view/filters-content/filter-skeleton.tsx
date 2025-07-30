import { Skeleton } from "@/components/ui/skeleton";

const FilterSkeleton = () => {
	return (
		<div role="status">
			<span className="sr-only">Loading...</span>
			<div>
				<Skeleton className="mb-6 h-6 w-full" />
				<div className="flex flex-col space-y-3">
					<Skeleton className="h-4 w-4/5" />
					<Skeleton className="h-4 w-2/4" />
					<Skeleton className="h-4 w-2/3" />
					<Skeleton className="h-4 w-2/4" />
					<Skeleton className="h-4 w-1/5" />
					<Skeleton className="h-4 w-3/5" />
				</div>
			</div>
		</div>
	);
};

export { FilterSkeleton };
