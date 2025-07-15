import type { ProductOption, ProductVariant } from "@/types/domain.types";

import { AddToCartButton } from "@/components/product/overview/add-to-cart-button";
import { AddToWishlistButton } from "@/components/product/overview/add-to-wishlist-button";
import { VariantSelector } from "@/components/product/overview/variant-selector";

import { cn } from "@/lib/utils/general/cn";

type PurchaseActionsSectionProps = {
	hasVariants: boolean;
	options: ProductOption[];
	variants: ProductVariant[];
	isInventoryLoading: boolean;
	isInventoryError: boolean;
	isOutOfStock: boolean;
	isMutating: boolean;
	handleVariantChange: (variant: ProductVariant | null) => void;
	handleAddToCart: () => void;
};

const InventoryStatusMessage = ({
	isInventoryError,
	isOutOfStock,
}: {
	isInventoryError: boolean;
	isOutOfStock: boolean;
}) => {
	const containerClassName = "mt-2.5";
	const contentClassName = "text-error-600 px-px text-xs font-bold";

	if (isInventoryError) {
		return (
			<div className={containerClassName}>
				<p className={contentClassName}>
					Unable to retrieve product inventory at the moment. Please try again later.
				</p>
			</div>
		);
	}

	if (isOutOfStock) {
		return (
			<div className={containerClassName}>
				<p className={contentClassName}>Currently sold out. Check back later.</p>
			</div>
		);
	}

	return null;
};

const PurchaseActionsSection = ({
	hasVariants,
	options,
	variants,
	isInventoryLoading,
	isInventoryError,
	isOutOfStock,
	isMutating,
	handleVariantChange,
	handleAddToCart,
}: PurchaseActionsSectionProps) => (
	<>
		{hasVariants && (
			<div className="pb-8">
				<VariantSelector
					options={options}
					variants={variants}
					disabled={isInventoryLoading || isMutating}
					onVariantChange={handleVariantChange}
				/>
			</div>
		)}

		<div className="flex flex-col flex-wrap gap-4 md:flex-row">
			<AddToCartButton
				label={isOutOfStock ? "Out Of Stock" : "Add To Cart"}
				disabled={isInventoryLoading || isInventoryError || isOutOfStock || isMutating}
				onClick={handleAddToCart}
				className={cn("w-full md:w-max", isOutOfStock && "bg-neutral-500 hover:bg-neutral-500")}
			/>
			<AddToWishlistButton className="w-full md:w-max" />
		</div>

		<InventoryStatusMessage isInventoryError={isInventoryError} isOutOfStock={isOutOfStock} />
	</>
);

export { PurchaseActionsSection };
