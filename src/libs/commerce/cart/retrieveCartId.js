import getClient from '@config/commerce';
import { setCookie, getCookie } from 'cookies-next';
import { CART_COOKIE_KEY } from '@constants';
import isEmpty from 'lodash-es/isEmpty';

/**
 * Retrieves cart ID (server-side only).
 */
const retrieveCartId = async (req, res) => {
	const client = getClient({ useSecretKey: false });
	let cartId = getCookie(CART_COOKIE_KEY, { req, res });

	/** Create a new cart if none exists. */
	if (isEmpty(cartId)) {
		try {
			const cart = await client.request('carts', 'get');
			cartId = cart?.id;
			const cookieOptions = {
				req,
				res,
				httpOnly: true,
				maxAge: 60 * 60 * 672, // 28 Days
			};
			setCookie(CART_COOKIE_KEY, cartId, cookieOptions);
		} catch (error) {
			throw Error('Failed to retrieve cart ID.');
		}
	}

	return cartId;
};

export default retrieveCartId;
