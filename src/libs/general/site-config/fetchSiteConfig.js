import { groq } from 'next-sanity';
import client from '@config/sanity';
import SiteConfigQuery from '@libs/queries/SiteConfig';

/**
 * Fetch site configuration.
 */
const fetchSiteConfig = async (preview = false) => {
	const query = groq`{"siteConfig": ${SiteConfigQuery}}`;
	const data = await client(preview).fetch(query);
	return data;
};

export default fetchSiteConfig;
