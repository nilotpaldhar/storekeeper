"use client";

import type { ProductDetails, ProductVariant } from "@/types/domain.types";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useProductInventory } from "@/hooks/products";

import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { AddToWishlistButton } from "@/components/product/add-to-wishlist-button";
import {
	ImageGalleryDesktop,
	ImageGalleryMobile,
} from "@/components/product/overview/image-gallery";
import { NavigationTrail } from "@/components/product/overview/navigation-trail";
import { PricingSummary } from "@/components/product/overview/pricing-summary";
import { RatingSummary } from "@/components/product/overview/rating-summary";
import { Specifications } from "@/components/product/overview/specifications";
import { VariantSelector } from "@/components/product/overview/variant-selector";
import { ProductSharePopover } from "@/components/product/share-popover";
import { Block, BlockContent, BlockTitle } from "@/components/ui/block";
import { CollapsibleText } from "@/components/ui/collapsible-text";
import { Divider } from "@/components/ui/divider";

import { cn } from "@/lib/utils/general/cn";
import { createCanonicalUrl } from "@/lib/utils/general/create-canonical-url";

type ProductOverviewProps = {
	details: ProductDetails;
	className?: string;
};

const ProductOverview = ({
	details: {
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
	},
	className,
}: ProductOverviewProps) => {
	const pathname = usePathname();
	const shareUrl = createCanonicalUrl({ pathname });

	const [activeSkuId, setActiveSkuId] = useState<string | null>(null);
	const activeSku = hasVariants ? variants.find((v) => v.sku?.id === activeSkuId)?.sku : sku;

	const {
		data,
		isLoading: isInventoryLoading,
		isError: isInventoryError,
	} = useProductInventory({ skuId: activeSkuId ?? "", enabled: !!activeSku });
	const isOutOfStock = (!isInventoryLoading || !isInventoryError) && data?.data?.quantity === 0;

	const handleVariantChange = useCallback((variant: ProductVariant | null) => {
		setActiveSkuId(variant?.sku?.id ?? null);
	}, []);

	useEffect(() => {
		if (!hasVariants) setActiveSkuId(sku?.id ?? null);
	}, [hasVariants, sku?.id]);

	return (
		<div className={cn("space-y-6 md:pt-8", className)}>
			<div className="hidden grid-cols-12 gap-8 md:grid">
				<div className="col-span-full lg:col-span-7">
					<div className="flex flex-wrap items-center justify-between space-x-4">
						<NavigationTrail breadcrumb={breadcrumb} />
						<ProductSharePopover title={title} url={shareUrl} />
					</div>
				</div>
			</div>
			<div className="grid grid-cols-12 gap-8">
				<div className="col-span-full lg:col-span-7">
					<div className="relative md:hidden">
						<ImageGalleryMobile gallery={gallery} />
						<div className="absolute bottom-12 left-0 z-50 w-full md:hidden">
							<div className="flex justify-between px-4 py-2">
								<div>
									<RatingSummary className="rounded-full border-transparent bg-white" compact />
								</div>
								<div>
									<ProductSharePopover title={title} url={shareUrl} side="top" align="end" />
								</div>
							</div>
						</div>
					</div>
					<div className="hidden md:block">
						<ImageGalleryDesktop gallery={gallery} />
					</div>
				</div>
				<div className="col-span-full lg:col-span-5">
					<article className="">
						<section>
							<div className="flex flex-col space-y-2">
								<p className="text-base leading-6 font-bold text-neutral-500 uppercase">
									{brand?.title}
								</p>
								<h1 className="text-2xl leading-8 font-semibold">{title}</h1>
							</div>
							<div className="flex flex-wrap items-center gap-6 pt-4">
								<div aria-labelledby="product-rating" className="hidden md:block">
									<RatingSummary />
								</div>
								<div aria-labelledby="product-price">
									<PricingSummary sku={activeSku ?? null} />
								</div>
							</div>
						</section>
						<Divider type="solid" className="my-6 before:border-neutral-100" />
						<section>
							{hasVariants ? (
								<div className="pb-8">
									<VariantSelector
										options={options}
										variants={variants}
										disabled={isInventoryLoading}
										onVariantChange={handleVariantChange}
									/>
								</div>
							) : null}
							<div className="flex flex-col flex-wrap gap-4 md:flex-row">
								<AddToCartButton
									label={isOutOfStock ? "Out Of Stock" : "Add To Cart"}
									disabled={isInventoryLoading || isInventoryError || isOutOfStock}
									className={cn(
										"w-full md:w-max",
										isOutOfStock && "bg-neutral-500 hover:bg-neutral-500"
									)}
								/>
								<AddToWishlistButton className="w-full md:w-max" />
							</div>
							{isInventoryError || isOutOfStock ? (
								<div className="mt-2.5">
									{isInventoryError ? (
										<p className="text-error-600 px-px text-xs font-bold">
											Unable to retrieve product inventory at the moment. Please try again later.
										</p>
									) : null}
									{isOutOfStock ? (
										<p className="text-error-600 px-px text-xs font-bold">
											Currently sold out. Check back later.
										</p>
									) : null}
								</div>
							) : null}
						</section>
						<Divider type="solid" className="my-6 before:border-neutral-100" />
						<section>
							{description ? (
								<Block className="pb-8">
									<BlockTitle>Product Details</BlockTitle>
									<BlockContent>
										<CollapsibleText
											text={description}
											previewLength={300}
											className="leading-relaxed"
										/>
									</BlockContent>
								</Block>
							) : null}

							{specifications.length > 0 ? (
								<Block className="space-y-4 pb-6">
									<BlockTitle>Specifications</BlockTitle>
									<BlockContent>
										<Specifications specifications={specifications} />
									</BlockContent>
								</Block>
							) : null}

							<Block className="flex-row flex-wrap items-center gap-3 space-y-0">
								<BlockTitle className="whitespace-nowrap">Product Code:</BlockTitle>
								<BlockContent>
									<p className="text-sm leading-none font-normal whitespace-nowrap">
										{activeSku?.code ?? "?"}
									</p>
								</BlockContent>
							</Block>
						</section>
					</article>
				</div>
			</div>
		</div>
	);
};

export { ProductOverview };
