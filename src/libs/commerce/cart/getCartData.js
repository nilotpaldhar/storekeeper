import getChecClient from '@config/commerce';
import { setCartCookie } from '@libs/commerce/cart/storage';
import retrieveCartId from '@libs/commerce/cart/retrieveCartId';

const checClient = getChecClient({ useSecretKey: false });

/**
 * Fetch card data (server-side only).
 */
const getCartData = async (req, res) => {
	try {
		const cartId = await retrieveCartId(req, res);

		const cart = await checClient.cart.retrieve(cartId);
		if (cart.id !== cartId) setCartCookie(req, res, cart.id);

		return cart;
	} catch (error) {
		throw Error('Failed to load cart data.');
	}
};

export default getCartData;
