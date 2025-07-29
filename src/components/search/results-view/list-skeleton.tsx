import type { ProductCollectionLayout } from "@/types/ui.types";

import { useInstantSearch } from "react-instantsearch";

import { Skeleton, SkeletonImage } from "@/components/ui/skeleton";

const ListSkeleton = ({ count = 12 }: { count?: number }) => {
	const items = [...Array(count).keys()];

	return (
		<div className="grid grid-cols-1 gap-y-6 md:gap-y-8">
			{items.map((s) => (
				<div key={s} className="group relative border-b border-neutral-100 pb-8">
					<div className="flex items-center space-x-4 md:space-x-8">
						<SkeletonImage className="h-52 lg:h-60" />
						<div className="flex-1">
							<div className="space-y-2">
								<Skeleton className="h-4 w-28" />
								<Skeleton className="h-7 w-56" />
								<Skeleton className="h-12 w-full" />
							</div>
							<div className="pt-6">
								<Skeleton className="h-5 w-44" />
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

const GridSkeleton = ({ count = 12 }: { count?: number }) => {
	const items = [...Array(count).keys()];

	return (
		<div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 md:gap-x-4 md:gap-y-8 lg:grid-cols-4 lg:gap-y-10">
			{items.map((s) => (
				<SkeletonImage key={s} />
			))}
		</div>
	);
};

const SearchResultsListSkeleton = ({ activeLayout }: { activeLayout: ProductCollectionLayout }) => {
	const { status } = useInstantSearch();

	if (status === "loading" || status === "stalled") {
		return activeLayout === "list" ? <ListSkeleton /> : <GridSkeleton />;
	}

	return null;
};

export { SearchResultsListSkeleton };
