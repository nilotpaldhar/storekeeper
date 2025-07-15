"use client";

import type { ProductDetails, ProductVariant } from "@/types/domain.types";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { useAddCartItem } from "@/hooks/cart";
import { useProductInventory } from "@/hooks/products";

import { DetailsSection } from "@/components/product/overview/sections/details";
import { GallerySection } from "@/components/product/overview/sections/gallery";
import { HeaderSection } from "@/components/product/overview/sections/header";
import { InfoSection } from "@/components/product/overview/sections/info";
import { PurchaseActionsSection } from "@/components/product/overview/sections/purchase-actions";
import { Divider } from "@/components/ui/divider";

import { cn } from "@/lib/utils/general/cn";
import { createCanonicalUrl } from "@/lib/utils/general/create-canonical-url";

type ProductOverviewProps = {
	details: ProductDetails;
	className?: string;
};

const ProductOverview = ({ details, className }: ProductOverviewProps) => {
	const {
		title,
		description,
		hasVariants,
		brand,
		options,
		variants,
		specifications,
		sku,
		gallery,
		breadcrumb,
	} = details;

	// Get current path for canonical share URL
	const pathname = usePathname();
	const shareUrl = createCanonicalUrl({ pathname });

	// Active SKU is the one currently selected (if there are variants)
	const [activeSkuId, setActiveSkuId] = useState<string | null>(null);

	// Resolve the SKU based on selected variant or fallback to base SKU
	const activeSku = hasVariants ? variants.find((v) => v.sku?.id === activeSkuId)?.sku : sku;

	// Fetch real-time inventory for selected SKU
	const { data, isLoading, isError } = useProductInventory({
		skuId: activeSkuId ?? "",
		enabled: !!activeSkuId,
	});

	// Check if inventory call is done & successful
	const isInventoryReady = !isLoading && !isError;
	const quantity = data?.data?.quantity ?? 0;

	// Safe out-of-stock check
	const isOutOfStock = isInventoryReady && quantity <= 0;

	// Mutation to add the product to cart
	const addCartItemMutation = useAddCartItem();

	// Called when user picks a variant option
	const handleVariantChange = useCallback((variant: ProductVariant | null) => {
		setActiveSkuId(variant?.sku?.id ?? null);
	}, []);

	// Handle Add To Cart click
	const handleAddToCart = () => {
		if (!activeSku?.code) return;
		addCartItemMutation.mutate(
			{ skuCode: activeSku.code },
			{
				onError: (error) => toast.error(error.message),
				onSuccess: ({ message }) => toast.success(message),
			}
		);
	};

	// When no variants: lock active SKU to default
	useEffect(() => {
		if (!hasVariants) setActiveSkuId(sku?.id ?? null);
	}, [hasVariants, sku?.id]);

	return (
		<div className={cn("space-y-6 md:pt-8", className)}>
			{/* Top breadcrumb trail and share button */}
			<HeaderSection breadcrumb={breadcrumb} title={title} shareUrl={shareUrl} />

			<div className="grid grid-cols-12 gap-8">
				{/* Gallery section handles responsive image galleries */}
				<div className="col-span-full lg:col-span-7">
					<GallerySection gallery={gallery} title={title} shareUrl={shareUrl} />
				</div>

				{/* Right side: product info, actions, and details */}
				<div className="col-span-full lg:col-span-5">
					{/* Brand, title, price, rating */}
					<InfoSection brand={brand?.title} title={title} activeSku={activeSku ?? null} />

					<Divider type="solid" className="my-6 before:border-neutral-100" />

					{/* Variant selector, add to cart, wishlist, stock messages */}
					<PurchaseActionsSection
						hasVariants={hasVariants}
						options={options}
						variants={variants}
						isInventoryLoading={isLoading}
						isInventoryError={isError}
						isOutOfStock={isOutOfStock}
						isMutating={addCartItemMutation.isPending}
						handleVariantChange={handleVariantChange}
						handleAddToCart={handleAddToCart}
					/>

					<Divider type="solid" className="my-6 before:border-neutral-100" />

					{/* Description, specs, SKU code */}
					<DetailsSection
						description={description}
						specifications={specifications}
						skuCode={activeSku?.code ?? "N/A"}
					/>
				</div>
			</div>
		</div>
	);
};

export { ProductOverview };
