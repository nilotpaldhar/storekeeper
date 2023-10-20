import client from '@config/sanity';
import getWishlistData from '@libs/commerce/wishlist/getWishlistData';

const sanity = client({ useCdn: false, useToken: true });

/**
 * Deletes existing wishlist and return a new one.
 */
const clearWishlist = async (req, res) => {
	const wishlist = await getWishlistData(req, res);

	try {
		await sanity.delete(wishlist?.id);
		const data = await getWishlistData(req, res);
		return data;
	} catch (error) {
		throw new Error('Failed to clear wishlist');
	}
};

export default clearWishlist;
