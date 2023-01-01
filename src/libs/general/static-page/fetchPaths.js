import { groq } from 'next-sanity';
import client from '@config/sanity';
import isArray from 'lodash-es/isArray';
import isEmpty from 'lodash-es/isEmpty';

/**
 * Fetch paths for static pages.
 */
const fetchPaths = async () => {
	const query = groq`
    *[_type == "page" && defined(slug.current)]{ 
      "slug": slug.current 
    }
	`;

	/** Fetch slugs. */
	const pages = await client(false).fetch(query);

	if (isEmpty(pages) || !isArray(pages)) return [];

	return pages?.map((page) => {
		const slugs = page.slug.split('/').filter((e) => e);
		return { params: { slug: slugs } };
	});
};

export default fetchPaths;
