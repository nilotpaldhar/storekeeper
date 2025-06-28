import { getSanityClient } from "@/lib/sanity/client";
import { GlobalSeo, StaticPageSeo } from "@/lib/sanity/queries";

const getGlobalSeo = async () => {
	const seo = await getSanityClient().fetch(GlobalSeo);
	return seo;
};

const getStaticPageSeoBySlug = async ({ slug }: { slug: string }) => {
	const seo = await getSanityClient().fetch(StaticPageSeo, { slug });
	return seo;
};

export { getGlobalSeo, getStaticPageSeoBySlug };
