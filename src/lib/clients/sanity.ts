import { createClient } from "next-sanity";

import { env } from "@/lib/config/env";
import { config } from "@/lib/config/sanity";

/**
 * Helper function for easily switching between normal client and preview client.
 */
const getSanityClient = ({
	useCdn = env.NODE_ENV === "production",
	useToken = false,
}: { useCdn?: boolean; useToken?: boolean } = {}) => {
	return createClient({
		projectId: config.projectId,
		dataset: config.dataset,
		apiVersion: config.apiVersion,
		useCdn,
		token: useToken ? config.accessToken : undefined,
	});
};

export { getSanityClient };
