import "server-only";

import { getSanityClient } from "@/lib/clients/sanity";
import { logEvent } from "@/lib/logging/log-event";
import {
	NotFoundPageQuery,
	StaticPageQuery,
	StaticPageSlugsQuery,
	HomePageQuery,
} from "@/lib/queries/sanity";

/**
 * Fetches an array of static page slugs from the CMS.
 */
const getStaticPageSlugs = async () => {
	try {
		const slugs = await getSanityClient().fetch(StaticPageSlugsQuery);
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
		const page = await getSanityClient().fetch(StaticPageQuery, { slug });
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
 * Fetches the 404 Not Found page content from Sanity.
 */
const getNotFoundPage = async () => {
	try {
		const page = await getSanityClient().fetch(NotFoundPageQuery);
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

/**
 * Fetches ...
 */
const getNotHomePage = async () => {
	try {
		const page = await getSanityClient().fetch(HomePageQuery);
		if (!page) return null;
		return page;
	} catch (err) {
		logEvent({
			fn: "getNotHomePage",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

export { getStaticPageSlugs, getStaticPageBySlug, getNotFoundPage, getNotHomePage };
