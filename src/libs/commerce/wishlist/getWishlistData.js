import { groq } from 'next-sanity';
import client from '@config/sanity';
import isEmpty from 'lodash-es/isEmpty';

import { ProductCollectionQuery } from '@libs/queries/Product';
import { setWishlistCookie } from '@libs/commerce/wishlist/storage';
import retrieveWishlistId from '@libs/commerce/wishlist/retrieveWishlistId';

const sanity = client({ useCdn: false, useToken: true });

/**
 * Create new wishlist.
 */
const createWishlist = async () => {
	const defaultData = { totalItems: 0, isEmpty: true, items: [] };

	// eslint-disable-next-line no-underscore-dangle
	const id = (await sanity.create({ _type: 'wishlist' }))._id;

	if (isEmpty(id)) {
		throw new Error('Failed to create wishlist.');
	}

	return { id, ...defaultData };
};

/**
 * Get wishlisted products.
 */
const getWishlistData = async (req, res) => {
	const wishlistId = await retrieveWishlistId(req, res);

	const query = groq`
		*[_type == "wishlist" && _id == $id][0]{
			"id": _id,
			"totalItems": coalesce(count(items), 0),
			"isEmpty": coalesce(count(items) <= 0, true),
			items[]->{
				${ProductCollectionQuery}
			}
		}
	`;

	const wishlist = await sanity.fetch(query, { id: wishlistId });

	/** Create new wishlist if id does not exits. */
	if (isEmpty(wishlistId) || isEmpty(wishlist)) {
		const newWishlist = await createWishlist();
		setWishlistCookie(req, res, newWishlist?.id);
		return newWishlist;
	}

	return {
		...wishlist,
		items: wishlist?.items ?? [],
	};
};

export default getWishlistData;
