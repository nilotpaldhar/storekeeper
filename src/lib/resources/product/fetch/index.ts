import "server-only";

import { logEvent } from "@/lib/logging/log-event";
import { getSanityClient } from "@/lib/clients/sanity";
import { ProductSlugs, Product } from "@/lib/queries/sanity";

/**
 *
 */
const getProductSlugs = async ({ limit = 10 }: { limit?: number } = {}) => {
	try {
		const slugs = await getSanityClient().fetch(ProductSlugs, { limit });
		if (!slugs || !Array.isArray(slugs)) return null;
		return slugs.map(({ slug }) => slug);
	} catch (err) {
		logEvent({
			fn: "getProductSlugs",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

/**
 *
 *
 * @param {Object} params - An object containing the `slug` string.
 */
const getProductBySlug = async ({ slug }: { slug: string }) => {
	try {
		const product = await getSanityClient().fetch(Product, { slug });
		if (!product) return null;
		return product;
	} catch (err) {
		logEvent({
			fn: "getProductBySlug",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

export { getProductSlugs, getProductBySlug };
