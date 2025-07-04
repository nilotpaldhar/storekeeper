"use client";

import type { ProductDetails } from "@/types/domain.types";

import { Divider } from "@/components/ui/divider";
import { Block, BlockTitle, BlockContent } from "@/components/ui/block";

import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { AddToWishlistButton } from "@/components/product/add-to-wishlist-button";
import { ProductBreadcrumb } from "@/components/product/breadcrumb";
import { ProductImageGallery } from "@/components/product/image-gallery";
import { ProductOptions } from "@/components/product/options";
import { ProductPricing } from "@/components/product/pricing";
import { ProductRating } from "@/components/product/rating";
import { ProductShareDropdown } from "@/components/product/share-dropdown";
import { ProductSpecifications } from "@/components/product/specifications";

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
	return (
		<div className="flex space-x-8">
			<div className="flex-1/2">
				<div className="spax flex items-center justify-between">
					<ProductBreadcrumb />
					<ProductShareDropdown />
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
						<div aria-labelledby="product-price">
							<ProductPricing />
						</div>
						<div aria-labelledby="product-rating">
							<ProductRating />
						</div>
					</div>
				</section>
				<Divider type="solid" className="my-6 before:border-neutral-200" />
				<section>
					{hasVariants ? (
						<div className="pb-8">
							<ProductOptions options={options} />
						</div>
					) : null}
					<div className="flex space-x-4">
						<AddToCartButton />
						<AddToWishlistButton />
					</div>
				</section>
				<Divider type="solid" className="my-6 before:border-neutral-200" />
				<section>
					{description ? (
						<Block className="pb-8">
							<BlockTitle>Product Details</BlockTitle>
							<BlockContent>
								<p className="leading-relaxed">{description}</p>
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
							<p className="text-sm leading-none font-normal">
								{hasVariants ? variants.at(0)?.sku?.code : sku?.code}
							</p>
						</BlockContent>
					</Block>
				</section>
			</article>
		</div>
	);
};

export { ProductDetails };
