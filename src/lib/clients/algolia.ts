import algoliasearch from "algoliasearch";

import { config } from "@/lib/config/algolia";

const adminAlgoliaClient = algoliasearch(config.appId, config.writeApikey);
const searchClient = algoliasearch(config.appId, config.searchApikey);

export { adminAlgoliaClient, searchClient };
