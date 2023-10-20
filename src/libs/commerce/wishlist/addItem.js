import client from '@config/sanity';
import getWishlistData from '@libs/commerce/wishlist/getWishlistData';

const sanity = client({ useCdn: false, useToken: true });

/**
 * Add item to wishlist.
 *
 * @param {string} wishlistId Wishlist ID.
 * @param {string} itemId Product ID (sanity).
 */
const addItem = async (req, res, itemId) => {
	const wishlist = await getWishlistData(req, res);
	const itemAlreadyExists = wishlist?.items?.some((item) => item?.sanityId === itemId);

	if (itemAlreadyExists) {
		throw new Error('Item already exists');
	}

	try {
		await sanity
			.patch(wishlist?.id)
			.setIfMissing({ items: [] })
			.append('items', [{ _type: 'reference', _ref: itemId }])
			.commit({ autoGenerateArrayKeys: true });

		const data = await getWishlistData(req, res);
		return data;
	} catch (error) {
		throw new Error('Failed to add item to wishlist');
	}
};

export default addItem;
