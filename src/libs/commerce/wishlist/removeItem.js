import client from '@config/sanity';
import getWishlistData from '@libs/commerce/wishlist/getWishlistData';

const sanity = client({ useCdn: false, useToken: true });

// product-prod_7ZAMo10OMEwNJ4 -> Noise Buds VS102 Truly Wireless Bluetooth
// product-prod_8XxzoBKnxK5PQA -> Boult Audio Thunder Bluetooth
// product-prod_LvJjoPKvWdwe0n -> boAt Airdopes 131 Bluetooth Headset

/**
 * Remove item from wishlist.
 */
const removeItem = async (req, res, itemId) => {
	const wishlist = await getWishlistData(req, res);
	const itemIndex = wishlist?.items?.findIndex((item) => item?.sanityId === itemId);

	if (itemIndex === -1) {
		throw new Error('Item does not exists');
	}

	const itemToRemove = [`items[${itemIndex}]`, `items[_id=="${itemId}"]`];

	try {
		await sanity.patch(wishlist?.id).unset(itemToRemove).commit();
		const data = await getWishlistData(req, res);
		return data;
	} catch (error) {
		throw new Error('Failed to remove item from wishlist');
	}
};

export default removeItem;
