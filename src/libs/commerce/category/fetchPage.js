import { groq } from 'next-sanity';
import client from '@config/sanity';
import SiteConfigQuery from '@libs/queries/SiteConfig';

import isEmpty from 'lodash-es/isEmpty';

/**
 * Fetch product category page data.
 */
const fetchPage = async (preview = false, slug = null) => {
	const options = { useCdn: !preview, useToken: preview };

	const query = groq`
    {
      "page": *[_type == "category"  && slug == $slug][0]{
        'id': _id,
        parentID,
        title,
        slug,
        description,
        seo,
        breadcrumbs[]{
          id, title, permalink
        },
        children[]{ 
          id, title, slug 
        }
      },
      "siteConfig": ${SiteConfigQuery}
    }
  `;

	if (isEmpty(slug)) return null;

	/** Fatch page data. */
	const data = await client(options).fetch(query, { slug });
	return data?.page ? data : null;
};

export default fetchPage;
