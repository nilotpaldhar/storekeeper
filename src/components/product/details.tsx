"use client";

import type { ProductDetails, ProductVariant } from "@/types/domain.types";

import { useCallback, useEffect, useState } from "react";

import { Divider } from "@/components/ui/divider";
import { CollapsibleText } from "@/components/ui/collapsible-text";
import { Block, BlockTitle, BlockContent } from "@/components/ui/block";

import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { AddToWishlistButton } from "@/components/product/add-to-wishlist-button";
import { ProductBreadcrumb } from "@/components/product/breadcrumb";
import { ProductImageGallery } from "@/components/product/image-gallery";
import { ProductVariantSelector } from "@/components/product/variant-selector";
import { ProductPricing } from "@/components/product/pricing";
import { ProductRating } from "@/components/product/rating";
import { ProductSharePopover } from "@/components/product/share-popover";
import { ProductSpecifications } from "@/components/product/specifications";
import { useProductInventory } from "@/hooks/product";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils/general/cn";
import { createCanonicalUrl } from "@/lib/utils/general/create-canonical-url";

type ProductDetailsProps = ProductDetails & {};

const ProductDetails = ({
	title,
	description,
	hasVariants,
	brand,
	options,
	variants,
	specifications,
	sku,
	gallery,
}: ProductDetailsProps) => {
	const pathname = usePathname();

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
		<div className="flex space-x-8">
			<div className="flex-1/2">
				<div className="spax flex items-center justify-between">
					<ProductBreadcrumb />
					<ProductSharePopover title={title} url={createCanonicalUrl({ pathname })} />
				</div>
				<div className="pt-6">
					<ProductImageGallery gallery={gallery} />
				</div>
			</div>
			<article className="flex-1/2">
				<section>
					<div className="flex flex-col space-y-2">
						<p className="text-base leading-6 font-bold text-neutral-500 uppercase">
							{brand?.title}
						</p>
						<h1 className="text-2xl leading-8 font-semibold">{title}</h1>
					</div>
					<div className="flex items-center space-x-6 pt-4">
						<div aria-labelledby="product-rating">
							<ProductRating />
						</div>
						<div aria-labelledby="product-price">
							<ProductPricing sku={activeSku ?? null} />
						</div>
					</div>
				</section>
				<Divider type="solid" className="my-6 before:border-neutral-200" />
				<section>
					{hasVariants ? (
						<div className="pb-8">
							<ProductVariantSelector
								options={options}
								variants={variants}
								disabled={isInventoryLoading}
								onVariantChange={handleVariantChange}
							/>
						</div>
					) : null}
					<div className="flex space-x-4">
						<AddToCartButton
							label={isOutOfStock ? "Out Of Stock" : "Add To Cart"}
							disabled={isInventoryLoading || isInventoryError || isOutOfStock}
							className={cn(isOutOfStock && "bg-neutral-500 hover:bg-neutral-500")}
						/>
						<AddToWishlistButton />
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
				<Divider type="solid" className="my-6 before:border-neutral-200" />
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
								<ProductSpecifications specifications={specifications} />
							</BlockContent>
						</Block>
					) : null}

					<Block className="flex-row items-center space-y-0 space-x-3">
						<BlockTitle>Product Code:</BlockTitle>
						<BlockContent>
							<p className="text-sm leading-none font-normal">{activeSku?.code ?? "?"}</p>
						</BlockContent>
					</Block>
				</section>
			</article>
		</div>
	);
};

export { ProductDetails };
