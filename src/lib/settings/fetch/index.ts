import { logEvent } from "@/lib/logging/log-event";
import { getSanityClient } from "@/lib/sanity/client";
import { GeneralSiteSettings, HeaderSettings, FooterSettings } from "@/lib/sanity/queries";

/**
 * Fetches the general site settings from the CMS.
 */
const getGeneralSiteSettings = async () => {
	try {
		const generalSettings = await getSanityClient().fetch(GeneralSiteSettings);
		if (!generalSettings) return null;
		return generalSettings;
	} catch (err) {
		logEvent({
			fn: "getGeneralSiteSettings",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

/**
 * Fetches the header settings from the CMS.
 */
const getHeaderSettings = async () => {
	try {
		const headerSettings = await getSanityClient().fetch(HeaderSettings);
		if (!headerSettings) return null;
		return headerSettings;
	} catch (err) {
		logEvent({
			fn: "getHeaderSettings",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

/**
 * Fetches the footer settings from the CMS.
 */
const getFooterSettings = async () => {
	try {
		const footerSettings = await getSanityClient().fetch(FooterSettings);
		if (!footerSettings) return null;
		return footerSettings;
	} catch (err) {
		logEvent({
			fn: "getFooterSettings",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

export { getGeneralSiteSettings, getHeaderSettings, getFooterSettings };
