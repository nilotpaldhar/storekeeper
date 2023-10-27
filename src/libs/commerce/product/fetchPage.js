import client from '@config/sanity';
import { groq } from 'next-sanity';

import SiteConfigQuery from '@libs/queries/SiteConfig';
import { ProductQuery } from '@libs/queries/Product';
import { parsePermalink } from '@utils/product/permalink';

import isEmpty from 'lodash-es/isEmpty';

/**
 * Fetch product page data.
 */
const fetchPage = async (preview = false, permalink = null) => {
	const options = { useCdn: !preview, useToken: preview };
	const { id, slug } = parsePermalink(permalink) ?? {};

	const query = groq`
    { 
      "page": *[_type == "product" && isActive == true && productID == $id && slug == $slug][0]{
        ${ProductQuery}
      },
      "siteConfig": ${SiteConfigQuery}
    }
  `;

	if (isEmpty(id)) return null;

	/** Fatch page data. */
	const data = await client(options).fetch(query, { id, slug: slug ?? '' });
	return data?.page ? data : null;
};

export default fetchPage;
