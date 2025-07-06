import { removeTrailingSlash } from "@/lib/utils/general/remove-trailing-slash";

/**
 * Create canonical URL for seo.
 */
const createCanonicalUrl = ({ pathname, domain }: { pathname: string; domain?: string }) => {
	const currentLocation = typeof window !== "undefined" ? window.location.origin : "";
	const baseUrl = removeTrailingSlash(domain || currentLocation);

	if (pathname === "/") return baseUrl;
	return `${baseUrl}${pathname}`.split("?").at(0) ?? baseUrl;
};

export { createCanonicalUrl };
