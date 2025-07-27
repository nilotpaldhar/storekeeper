import { env } from "@/lib/config/env";

const config = {
	appId: env.NEXT_PUBLIC_ALGOLIA_APP_ID,
	searchApikey: env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
	writeApikey: env.ALGOLIA_WRITE_API_KEY,
	productsSyncSecret: env.ALGOLIA_SANITY_PRODUCTS_SYNC_SECRET,
};

export { config };
