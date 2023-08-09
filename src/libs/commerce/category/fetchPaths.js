import { groq } from 'next-sanity';
import client from '@config/sanity';
import { PRODUCT_CATEGORY_PATHS_LIMIT } from '@constants';

import isArray from 'lodash-es/isArray';
import isEmpty from 'lodash-es/isEmpty';

/**
 * Fetch paths for product category pages.
 */
const fetchPaths = async (preview = false, limit = PRODUCT_CATEGORY_PATHS_LIMIT) => {
	const options = { useCdn: !preview, useToken: preview };

	const query = groq`
    *[_type == "category" && defined(slug) ] | order(_updatedAt desc) {
			slug
		}[0...$limit]
	`;

	/** Fetch categories. */
	const categories = await client(options).fetch(query, { limit });
	if (isEmpty(categories) || !isArray(categories)) return [];

	return categories?.map(({ slug }) => ({
		params: { slug },
	}));
};

export default fetchPaths;
