import { groq } from 'next-sanity';
import client from '@config/sanity';
import isEmpty from 'lodash-es/isEmpty';
import SiteConfigQuery from '@libs/queries/SiteConfig';
import PageSeoQuery from '@libs/queries/PageSeo';

/**
 * Fetch dynamic page data.
 */
const fetchPage = async (preview = false, type = null) => {
	if (isEmpty(type)) return null;

	const query = groq`
    { 
      "page": *[_type == "${type}"] | order(_updatedAt desc)[0] {
        title, 
        slug, 
        "seo": { ${PageSeoQuery} }
      }, 
      "siteConfig": ${SiteConfigQuery}
    }
  `;

	/** Fatch page data. */
	const data = await client({ useCdn: preview }).fetch(query);

	return data?.page ? data : null;
};

export default fetchPage;
