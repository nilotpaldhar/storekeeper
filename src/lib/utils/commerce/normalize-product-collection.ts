import "server-only";

import type { ProductSummary } from "@/types/domain.types";
import type { ProductSummaryQueryResult } from "@/types/sanity.types";

import { nanoid } from "nanoid";

import { getProductPrice } from "@/lib/resources/products/fetch/index";
import { normalizeProductImageGallery } from "@/lib/utils/commerce/normalize-product-image-gallery";

/**
 * Normalize a raw product collection into the internal ProductSummary format.
 */
const normalizeProductCollection = async (
	collection: ProductSummaryQueryResult[] | null
): Promise<ProductSummary[]> => {
	if (!collection || collection.length === 0) return [];

	const validItems = collection.filter((item) => item !== null);

	const normalizedProducts: ProductSummary[] = await Promise.all(
		validItems.map(async (item) => {
			const skuId = item.hasVariants ? item.variants?.at(0)?.sku?.id : item.sku?.id;
			const price = skuId ? await getProductPrice({ skuId }) : null;

			return {
				_key: nanoid(),
				id: item.id,
				title: item.title ?? "",
				slug: item.slug ?? "",
				description: item.description ?? null,
				hasVariants: item.hasVariants ?? false,
				category: item.taxon?.title ?? "",
				sku: item.sku ?? null,
				gallery: normalizeProductImageGallery(item.gallery),
				variants: Array.isArray(item.variants)
					? item.variants.map((variant) => ({
							refKey: variant.refKey,
							variantKey: variant.variantKey ?? "",
							sku: variant.sku ?? null,
							gallery: normalizeProductImageGallery(variant.gallery),
						}))
					: [],
				price,
			};
		})
	);

	return normalizedProducts;
};

export { normalizeProductCollection };
