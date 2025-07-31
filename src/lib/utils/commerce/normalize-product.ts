import "server-only";

import type { ProductDetails } from "@/types/domain.types";
import type { ProductQueryResult } from "@/types/sanity.types";

import { buildCategoryBreadcrumb } from "@/lib/resources/categories/services/index";
import { normalizeProductImageGallery } from "@/lib/utils/commerce/normalize-product-image-gallery";

/**
 * Normalize a raw product fetched from Sanity into a domain-level ProductDetails object.
 * Ensures that all optional fields are defaulted properly to prevent undefined values
 * leaking into the rest of the application.
 *
 * @param rawProduct - The raw product object from the CMS.
 * @returns A normalized ProductDetails object or null if the input is invalid.
 */
const normalizeProduct = async (
	rawProduct: ProductQueryResult | null | undefined
): Promise<ProductDetails | null> => {
	if (!rawProduct) return null;

	// Normalize brand if it exists
	const brand = rawProduct.brand
		? {
				id: rawProduct.brand.id,
				title: rawProduct.brand.title ?? "",
				slug: rawProduct.brand.slug ?? "",
			}
		: null;

	// Normalize specifications array
	const specifications = Array.isArray(rawProduct.specifications)
		? rawProduct.specifications.map((spec) => ({
				refKey: spec.refKey,
				label: spec.label ?? "",
				value: spec.value ?? "",
			}))
		: [];

	// Normalize product options
	const options = Array.isArray(rawProduct.options)
		? rawProduct.options.map((option) => ({
				refKey: option.refKey,
				name: option.name ?? "",
				values: Array.isArray(option.values) ? option.values : [],
			}))
		: [];

	// Normalize product variants
	const variants = Array.isArray(rawProduct.variants)
		? rawProduct.variants.map((variant) => ({
				refKey: variant.refKey,
				variantKey: variant.variantKey ?? "",
				sku: variant.sku ?? null,
				gallery: normalizeProductImageGallery(variant.gallery),
			}))
		: [];

	const taxonSlug = rawProduct.taxon?.slug ?? "";
	const breadcrumb = taxonSlug ? await buildCategoryBreadcrumb({ slug: taxonSlug }) : [];

	// Final normalized product object
	return {
		id: rawProduct.id,
		title: rawProduct.title ?? "",
		slug: rawProduct.slug ?? "",
		description: rawProduct.description ?? null,
		hasVariants: rawProduct.hasVariants ?? false,
		brand,
		options,
		variants,
		specifications,
		sku: rawProduct.sku ?? null,
		gallery: normalizeProductImageGallery(rawProduct.gallery),
		breadcrumb,
	};
};

export { normalizeProduct };
