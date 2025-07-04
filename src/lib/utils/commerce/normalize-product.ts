import type { ProductResult } from "@/types/sanity.types";
import type { ProductDetails, ProductImage } from "@/types/domain.types";
import { getImageUrl } from "../sanity/get-image-url";

/**
 * Normalize an array of gallery images.
 * Ensures consistent shape and default values.
 *
 * @param gallery - The raw gallery array.
 * @returns Normalized gallery array.
 */
const normalizeGallery = (gallery: NonNullable<ProductResult>["gallery"]): ProductImage[] => {
	if (!Array.isArray(gallery)) return [];
	return gallery.map(({ refKey, image, altText }) => ({
		refKey: refKey,
		src: image ? getImageUrl(image).url() : null,
		alt: altText ?? null,
	}));
};

/**
 * Normalize a raw product fetched from Sanity into a domain-level ProductDetails object.
 * Ensures that all optional fields are defaulted properly to prevent undefined values
 * leaking into the rest of the application.
 *
 * @param rawProduct - The raw product object from the CMS.
 * @returns A normalized ProductDetails object or null if the input is invalid.
 */
const normalizeProduct = (rawProduct: ProductResult | null | undefined): ProductDetails | null => {
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
				gallery: normalizeGallery(variant.gallery),
			}))
		: [];

	// Final normalized product object
	return {
		title: rawProduct.title ?? "",
		slug: rawProduct.slug ?? "",
		description: rawProduct.description ?? null,
		hasVariants: rawProduct.hasVariants ?? false,
		brand,
		options,
		variants,
		specifications,
		sku: rawProduct.sku ?? null,
		gallery: normalizeGallery(rawProduct.gallery),
	};
};

export { normalizeProduct };
