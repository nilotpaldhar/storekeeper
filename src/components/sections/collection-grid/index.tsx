import type { CollectionSummary } from "@/types/domain.types";

import { CollectionItem } from "@/components/sections/collection-grid/item";

type CollectionGridProps = {
	items: CollectionSummary[];
};

const CollectionGrid = ({ items }: CollectionGridProps) => {
	return (
		<div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
			{items.map((item) => (
				<div key={item.id}>
					<CollectionItem summary={item} />
				</div>
			))}
		</div>
	);
};
export { CollectionGrid };
