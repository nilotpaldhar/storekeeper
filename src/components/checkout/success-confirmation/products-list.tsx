import type { OrderLineItem } from "@/types/domain.types";

import { XIcon } from "lucide-react";

const ProductsListItem = ({ item }: { item: OrderLineItem }) => {
	const title = item.product?.title ?? item.name ?? "Unkonown Product";
	const quantity = item.quantity;
	const totalAmount = item.formatted_total_amount ?? "?";

	return (
		<div className="flex flex-wrap items-center justify-between gap-2 text-sm">
			<div className="flex items-center space-x-2.5" title={title}>
				<span className="line-clamp-1 max-w-96">{title}</span>
				<XIcon size={12} />
				<span>{quantity}</span>
			</div>
			<div className="">{totalAmount}</div>
		</div>
	);
};

const ProductsList = ({ items }: { items: OrderLineItem[] }) => {
	return (
		<ul className="flex flex-col space-y-4">
			{items.map((item) => (
				<li key={item.id}>
					<ProductsListItem item={item} />
				</li>
			))}
		</ul>
	);
};

export { ProductsList };
