import { WISHLIST_COOKIE_KEY } from '@constants';
import { setCookie, getCookie } from 'cookies-next';

/**
 * Set cookie for wishlist ID.
 */
export const setWishlistCookie = (req, res, wishlistId) => {
	if (typeof wishlistId === 'string') {
		const options = { req, res, httpOnly: true, sameSite: 'lax' };
		return setCookie(WISHLIST_COOKIE_KEY, wishlistId, options);
	}
	throw Error('Wishlist ID not valid');
};

/**
 * Get wishlist ID cookie.
 */
export const getWishlistCookie = (req, res) => {
	const wishlistId = getCookie(WISHLIST_COOKIE_KEY, { req, res });
	return wishlistId;
};
