import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

import { env } from "@/lib/env";

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-05-26";
const token = env.SANITY_ACCESS_TOKEN;

/**
 * Helper function for easily switching between normal client and preview client.
 */
const getClient = ({
	useCdn = env.NODE_ENV === "production",
	useToken = false,
}: { useCdn?: boolean; useToken?: boolean } = {}) => {
	return createClient({
		projectId,
		dataset,
		apiVersion,
		useCdn,
		token: useToken ? token : undefined,
	});
};

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
const urlFor = (source: SanityImageSource) => {
	return createImageUrlBuilder({ projectId, dataset }).image(source);
};

export { getClient, urlFor };
