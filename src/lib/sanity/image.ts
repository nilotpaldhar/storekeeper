import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import createImageUrlBuilder from "@sanity/image-url";
import { config } from "@/lib/config/sanity";

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
const getSanityImageUrl = (source: SanityImageSource) => {
	return createImageUrlBuilder({
		projectId: config.projectId,
		dataset: config.dataset,
	}).image(source);
};

export { getSanityImageUrl };
