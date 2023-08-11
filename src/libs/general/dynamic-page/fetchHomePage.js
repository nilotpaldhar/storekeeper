import { groq } from 'next-sanity';
import client from '@config/sanity';

import SiteConfigQuery from '@libs/queries/SiteConfig';
import HomePageQuery from '@libs/queries/HomePage';

/**
 * Fetch home page data.
 */
const fetchHomePage = async (preview = false) => {
	const query = groq`
    { 
      "page": *[_type == "homepage"] | order(_updatedAt desc)[0] {
        ${HomePageQuery}
      }, 
      "siteConfig": ${SiteConfigQuery}
    }
  `;

	/** Fatch page data. */
	const data = await client({ useCdn: !preview, useToken: preview }).fetch(query);
	return data?.page ? data : null;
};

export default fetchHomePage;
