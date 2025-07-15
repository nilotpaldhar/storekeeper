"use client";

import type { CartLineItem } from "@/types/domain.types";

import { CartItem } from "@/components/cart/item-list/item";
import { Divider } from "@/components/ui/divider";

type CartItemListProps = {
	items: CartLineItem[];
};

const CartItemList = ({ items }: CartItemListProps) => {
	return (
		<div className="xs:py-5 border border-dashed border-neutral-200 py-3">
			<ul>
				{items.map((item, idx) => (
					<li key={item.id}>
						<CartItem item={item} />
						{idx < items.length - 1 ? (
							<Divider className="mb-6 before:border-neutral-200 sm:my-6" type="dashed" />
						) : null}
					</li>
				))}
			</ul>
		</div>
	);
};

export { CartItemList };
