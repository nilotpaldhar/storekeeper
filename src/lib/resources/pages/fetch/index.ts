import "server-only";

import { logEvent } from "@/lib/logging/log-event";
import { getSanityClient } from "@/lib/clients/sanity";
import { StaticPageSlugs, StaticPage, NotFoundPage } from "@/lib/queries/sanity";

/**
 * Fetches an array of static page slugs from the CMS.
 */
const getStaticPageSlugs = async () => {
	try {
		const slugs = await getSanityClient().fetch(StaticPageSlugs);
		if (!slugs || !Array.isArray(slugs)) return null;
		return slugs.map(({ slug }) => slug);
	} catch (err) {
		logEvent({
			fn: "getStaticPageSlugs",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

/**
 * Fetches a single static page by its slug from the CMS.
 *
 * @param {Object} params - An object containing the `slug` string.
 */
const getStaticPageBySlug = async ({ slug }: { slug: string }) => {
	try {
		const page = await getSanityClient().fetch(StaticPage, { slug });
		if (!page) return null;
		return page;
	} catch (err) {
		logEvent({
			fn: "getStaticPageBySlug",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

/**
 *
 */
const getNotFoundPage = async () => {
	try {
		const page = await getSanityClient().fetch(NotFoundPage);
		if (!page) return null;
		return page;
	} catch (err) {
		logEvent({
			fn: "getNotFoundPage",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

export { getStaticPageSlugs, getStaticPageBySlug, getNotFoundPage };
