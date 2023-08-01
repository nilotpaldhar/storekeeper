import algoliasearch from 'algoliasearch';

/** Algolia API Keys. */
const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const searchApiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;

const searchClient = algoliasearch(appId, searchApiKey);

export default searchClient;
