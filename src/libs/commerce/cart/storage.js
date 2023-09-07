import { CART_COOKIE_KEY } from '@constants';
import { setCookie, getCookie } from 'cookies-next';

/**
 * Set cookie for cart ID.
 */
export const setCartCookie = (req, res, cartId) => {
	if (typeof cartId === 'string' && cartId?.startsWith('cart_')) {
		const options = { req, res, httpOnly: true, sameSite: 'lax' };
		return setCookie(CART_COOKIE_KEY, cartId, options);
	}
	throw Error('Cart ID not valid');
};

/**
 * Get cart ID cookie.
 */
export const getCartCookie = (req, res) => {
	const cartId = getCookie(CART_COOKIE_KEY, { req, res });
	return cartId;
};
