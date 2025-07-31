import "server-only";

import { getSanityClient } from "@/lib/clients/sanity";
import { logEvent } from "@/lib/logging/log-event";
import { CategorySlugsQuery, CategoryQuery } from "@/lib/queries/sanity";

/**
 * Fetches an array of ...
 */
const getCategorySlugs = async ({ limit = 10 }: { limit?: number } = {}) => {
	try {
		const slugs = await getSanityClient().fetch(CategorySlugsQuery, { limit });
		if (!slugs || !Array.isArray(slugs)) return null;
		return slugs.map(({ slug }) => slug);
	} catch (err) {
		logEvent({
			fn: "getCategorySlugs",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

/**
 * Fetches a ...
 *
 * @param {Object} params - An object containing the `slug` string.
 */
const getCategoryBySlug = async ({ slug }: { slug: string }) => {
	try {
		const page = await getSanityClient().fetch(CategoryQuery, { slug });
		if (!page) return null;
		return page;
	} catch (err) {
		logEvent({
			fn: "getCategoryBySlug",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

export { getCategorySlugs, getCategoryBySlug };
