import type { OrderLineItem } from "@/types/domain.types";

import Link from "next/link";

const OrderItem = ({ item }: { item: OrderLineItem }) => {
	const title = item.product?.title ?? item.name ?? "Unkonown Product";
	const productHref = item.product?.slug ? `/products/${item.product.slug}` : "#";
	const skuCode = item.sku_code ?? item.sku?.code ?? "?";
	const quantity = item.quantity;
	const totalAmount = item.formatted_total_amount ?? "?";

	return (
		<div className="flex flex-col space-y-1.5">
			<h3>
				<Link
					href={productHref}
					target="_blank"
					rel="noopener noreferrer"
					className="text-sm font-medium text-neutral-900"
				>
					{title}
				</Link>
			</h3>
			<div className="flex flex-col space-y-1.5 text-sm">
				<span className="flex items-center space-x-2">
					<small className="text-neutral-500">Product Code:</small>
					<small className="font-light">{skuCode}</small>
				</span>
				<div className="flex items-center space-x-5">
					<span className="flex items-center space-x-2">
						<small className="text-neutral-500">Quantity:</small>
						<small className="font-light">{quantity}</small>
					</span>
					<span className="flex items-center space-x-2">
						<small className="text-neutral-500">Total:</small>
						<small className="font-light">{totalAmount}</small>
					</span>
				</div>
			</div>
		</div>
	);
};

const OrderItemList = ({ items }: { items: OrderLineItem[] }) => {
	return (
		<ul className="flex flex-col space-y-6">
			{items.map((item) => (
				<li key={item.id}>
					<OrderItem item={item} />
				</li>
			))}
		</ul>
	);
};

export { OrderItemList };
