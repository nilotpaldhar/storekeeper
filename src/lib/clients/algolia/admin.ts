import algoliasearch from "algoliasearch";

import { env } from "@/lib/config/env";

const adminClient = algoliasearch(env.NEXT_PUBLIC_ALGOLIA_APP_ID, env.ALGOLIA_WRITE_API_KEY);

export { adminClient };
