"use client";

import type { CartLineItem } from "@/types/domain.types";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

import { useUpdateCartItem } from "@/hooks/cart";
import { useProductInventory } from "@/hooks/products";

import { ILLUSTRATIONS } from "@/constants/media";
import { useDialogStore } from "@/stores/use-dialog-store";

import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";

import { notifyFeatureUnavailable } from "@/lib/utils/toast";

type CartItemProps = {
	item: CartLineItem;
};

const CartItem = ({ item }: CartItemProps) => {
	const [quantity, setQuantity] = useState(item.quantity ?? 0);
	const { onOpen } = useDialogStore();

	const skuId = item.sku?.id ?? "";
	const { title: productTitle, slug: productSlug, thumbnail } = item.product ?? {};

	const { data: { data: inventory } = {} } = useProductInventory({ skuId, enabled: !!skuId });

	const updateCartItemMutation = useUpdateCartItem();

	const itemTitle = productTitle ?? item.name ?? "Unknown Product";
	const productHref = productSlug ? `/products/${productSlug}` : "#";

	const imageSrc = thumbnail?.src ?? ILLUSTRATIONS.PLACEHOLDERS.PRODUCT;
	const imageAlt = thumbnail?.alt ?? itemTitle;

	const maxQuantity = inventory?.quantity ?? item.quantity ?? 0;

	const handleQuantityChange = useCallback(
		(newQuantity: number) => {
			setQuantity(newQuantity);

			updateCartItemMutation.mutate({
				lineItemId: item.id,
				quantity: newQuantity,
			});
		},
		[updateCartItemMutation, item.id]
	);

	const handleRemoveItem = () => {
		onOpen("CONFIRM_REMOVE_CART_ITEM", { lineItemId: item.id, productTitle });
	};

	return (
		<div className="grid grid-cols-[minmax(0,140px)_1fr] gap-x-4 gap-y-2 sm:grid-cols-[minmax(0,160px)_1fr]">
			{/* Product image */}
			<div className="xs:col-span-1 xs:pr-0 xs:pl-5 col-span-full px-3">
				<div className="flex aspect-square items-center justify-center overflow-hidden rounded-xs bg-neutral-50">
					<Image src={imageSrc} alt={imageAlt} width={125} height={125} />
				</div>
			</div>

			{/* Product details */}
			<div className="xs:col-span-1 xs:pr-5 xs:pl-0 col-span-full px-3">
				<div className="space-y-2 pt-1">
					<h2 className="line-clamp-2">
						<Link
							href={productHref}
							title={itemTitle}
							target="_blank"
							rel="noopener noreferrer"
							className="block text-sm font-medium text-neutral-900 hover:text-neutral-500 lg:text-base"
						>
							{itemTitle}
						</Link>
					</h2>

					<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
						<p className="space-x-2 text-sm">
							<span className="inline-block text-neutral-500">Product Code:</span>
							<span className="inline-block bg-neutral-50 p-1 font-medium">
								{item.sku?.code ?? "N/A"}
							</span>
						</p>
					</div>

					<div className="flex items-center space-x-6 md:pt-3">
						<p className="space-x-2 text-sm">
							<span className="inline-block text-neutral-500">Price:</span>
							<span className="inline-block font-medium">
								{item.formatted_unit_amount ?? "---"}
							</span>
						</p>
						<p className="space-x-2 text-sm">
							<span className="inline-block text-neutral-500">Total:</span>
							<span className="inline-block font-medium">
								{item.formatted_total_amount ?? "---"}
							</span>
						</p>
					</div>
				</div>
			</div>

			{/* Quantity stepper */}
			<div className="xs:pr-0 xs:pl-5 col-span-full px-3 sm:col-span-1">
				<QuantityStepper
					max={maxQuantity}
					value={quantity}
					onChange={handleQuantityChange}
					disabled={updateCartItemMutation.isPending}
				/>
			</div>

			{/* Actions */}
			<div className="col-span-full pt-3 sm:col-span-1 sm:pt-0">
				<div className="flex items-center gap-4 border-t border-dashed border-neutral-200 sm:border-none">
					<Button
						variant="primary-ghost"
						className="h-10 flex-1 p-px font-bold sm:max-w-max"
						onClick={() => notifyFeatureUnavailable({ featureName: "Save For Later" })}
					>
						SAVE FOR LATER
					</Button>
					<span
						className="block h-10 w-1 border-r border-dashed border-neutral-200 sm:hidden"
						role="separator"
					></span>
					<Button
						variant="error-ghost"
						className="h-10 flex-1 p-px font-bold sm:max-w-max"
						onClick={handleRemoveItem}
					>
						REMOVE
					</Button>
				</div>
			</div>
		</div>
	);
};

export { CartItem };
