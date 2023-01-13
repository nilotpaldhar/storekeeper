import { groq } from 'next-sanity';
import client from '@config/sanity';
import isEmpty from 'lodash-es/isEmpty';
import SiteConfigQuery from '@libs/queries/SiteConfig';
import PageSeoQuery from '@libs/queries/PageSeo';

/**
 * Fetch static page data.
 */
const fetchPage = async (preview = false, slug = null) => {
	if (isEmpty(slug)) return null;
	const slugs = JSON.stringify([`/${slug}`, slug, `/${slug}/`]);
	const query = groq`
    { 
      "page": *[_type == "page" && slug.current in ${slugs}] | order(_updatedAt desc)[0] {
        title, 
        "slug": slug.current, 
        "content": pageContent, 
        "seo": { ${PageSeoQuery} }
      }, 
      "siteConfig": ${SiteConfigQuery}
    }
  `;

	/** Fatch page data. */
	const data = await client({ useCdn: preview }).fetch(query);

	return data?.page !== null ? data : null;
};

export default fetchPage;
