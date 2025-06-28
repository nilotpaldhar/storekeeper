import { getSanityClient } from "@/lib/sanity/client";
import { StaticPageSlugs, StaticPage } from "@/lib/sanity/queries";

const getStaticPageSlugs = async () => {
	const slugs = await getSanityClient().fetch(StaticPageSlugs);
	return slugs;
};

const getStaticPageBySlug = async ({ slug }: { slug: string }) => {
	const page = await getSanityClient().fetch(StaticPage, { slug });
	return page;
};

export { getStaticPageSlugs, getStaticPageBySlug };
