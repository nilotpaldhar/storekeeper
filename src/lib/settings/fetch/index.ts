import { getSanityClient } from "@/lib/sanity/client";
import { GeneralSiteSettings, HeaderSettings, FooterSettings } from "@/lib/sanity/queries";

const getGeneralSiteSettings = async () => {
	const generalSettings = await getSanityClient().fetch(GeneralSiteSettings);
	return generalSettings;
};

const getHeaderSettings = async () => {
	const headerSettings = await getSanityClient().fetch(HeaderSettings);
	return headerSettings;
};

const getFooterSettings = async () => {
	const footerSettings = await getSanityClient().fetch(FooterSettings);
	return footerSettings;
};

export { getGeneralSiteSettings, getHeaderSettings, getFooterSettings };
