import { groq } from 'next-sanity';
import client from '@config/sanity';
import { PRODUCT_PATHS_LIMIT } from '@constants';
import { createPermalink } from '@utils/product/permalink';

import isArray from 'lodash-es/isArray';
import isEmpty from 'lodash-es/isEmpty';

/**
 * Fetch paths for product pages.
 */
const fetchPaths = async (preview = false, limit = PRODUCT_PATHS_LIMIT) => {
	const options = { useCdn: !preview, useToken: preview };
	const query = groq`
    *[_type == "product" && defined(productID) && isActive == true] | order(_updatedAt desc) {
			"id": productID, slug
		}[0...$limit]
	`;

	/** Fetch products. */
	const products = await client(options).fetch(query, { limit });
	if (isEmpty(products) || !isArray(products)) return [];

	return products?.map(({ id, slug }) => ({
		params: {
			permalink: createPermalink(id, slug),
		},
	}));
};

export default fetchPaths;
