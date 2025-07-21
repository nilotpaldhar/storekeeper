import "server-only";
import { getSanityClient } from "@/lib/clients/sanity";
import { logEvent } from "@/lib/logging/log-event";
import {
	GlobalSeo,
	NotFoundPageSeo,
	ProductSeo,
	StaticPageSeo,
	HomePageSeo,
} from "@/lib/queries/sanity";

/**
 * Fetches the global SEO settings from the CMS.
 */
const getGlobalSeo = async () => {
	try {
		const data = await getSanityClient().fetch(GlobalSeo);
		if (!data) return null;
		return data;
	} catch (err) {
		logEvent({
			fn: "getGlobalSeo",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

/**
 * Fetches the SEO settings for a specific static page by slug.
 *
 * @param {Object} params - An object containing the `slug` string.
 */
const getStaticPageSeoBySlug = async ({ slug }: { slug: string }) => {
	try {
		const data = await getSanityClient().fetch(StaticPageSeo, { slug });
		if (!data || !data.seo) return null;
		return data.seo;
	} catch (err) {
		logEvent({
			fn: "getStaticPageSeoBySlug",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

/**
 * Fetches the SEO metadata for the 404 Not Found page from Sanity.
 */
const getNotFoundPageSeo = async () => {
	try {
		const data = await getSanityClient().fetch(NotFoundPageSeo);
		if (!data || !data.seo) return null;
		return data.seo;
	} catch (err) {
		logEvent({
			fn: "getNotFoundPageSeo",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

/**
 * Fetches the SEO metadata for a specific product page by slug from Sanity.
 */
const getProductSeo = async ({ slug }: { slug: string }) => {
	try {
		const data = await getSanityClient().fetch(ProductSeo, { slug });
		if (!data || !data.seo) return null;
		return data.seo;
	} catch (err) {
		logEvent({
			fn: "getProductSeo",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

/**
 * Fetches the SEO metadata for...
 */
const getHomePageSeo = async () => {
	try {
		const data = await getSanityClient().fetch(HomePageSeo);
		if (!data || !data.seo) return null;
		return data.seo;
	} catch (err) {
		logEvent({
			fn: "getHomePageSeo",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

export { getGlobalSeo, getStaticPageSeoBySlug, getNotFoundPageSeo, getProductSeo, getHomePageSeo };
