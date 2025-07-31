import algoliasearch from "algoliasearch";

import { env } from "@/lib/config/env";

const searchClient = algoliasearch(
	env.NEXT_PUBLIC_ALGOLIA_APP_ID,
	env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

export { searchClient };
