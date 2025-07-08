import "server-only";

import type { ProductImage } from "@/types/domain.types";
import type { ProductQueryResult } from "@/types/sanity.types";

import { getImageUrl } from "@/lib/utils/sanity/get-image-url";

/**
 * Normalize an array of gallery images.
 * Ensures consistent shape and default values.
 *
 * @param gallery - The raw gallery array.
 * @returns Normalized gallery array.
 */
const normalizeProductImageGallery = (
	gallery: NonNullable<ProductQueryResult>["gallery"]
): ProductImage[] => {
	if (!Array.isArray(gallery)) return [];
	return gallery.map(({ refKey, image, altText }) => ({
		refKey: refKey,
		src: image ? getImageUrl(image).url() : null,
		alt: altText ?? null,
	}));
};

export { normalizeProductImageGallery };
