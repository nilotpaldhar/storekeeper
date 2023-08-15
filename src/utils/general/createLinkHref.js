import { createPermalink } from '@utils/product/permalink';

/**
 * Generates a valid href based on the type of resource.
 *
 * @param {string} type Resource type (page | category | product).
 * @param {object} data Metadata to generate a valid href.
 */
const createLinkHref = (type, data = {}) => {
	const { checId, slug } = data;
	const categoryPrefix = 'product/collection';
	const productPrefix = 'product';

	if (type === 'page') return `/${slug}`;
	if (type === 'category') return `/${categoryPrefix}/${slug}?query=${slug}`;
	if (type === 'product') return `/${productPrefix}/${createPermalink(checId, slug)}`;

	return null;
};

export default createLinkHref;
