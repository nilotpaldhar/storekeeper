import { createClient as createSanityClient } from "@sanity/client";
import { env } from "@/lib/env";

const client = createSanityClient({
	projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: env.NEXT_PUBLIC_SANITY_DATASET,
	token: env.SANITY_ACCESS_TOKEN,
	apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-06-01",
	useCdn: false,
});

export { client };
