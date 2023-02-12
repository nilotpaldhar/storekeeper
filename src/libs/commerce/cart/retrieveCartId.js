import { groq } from 'next-sanity';
import isEmpty from 'lodash-es/isEmpty';
import getChecClient from '@config/commerce';
import getSanityClient from '@config/sanity';
import { CART_COOKIE_KEY } from '@constants';
import { getServerSession } from 'next-auth/next';
import { setCookie, getCookie } from 'cookies-next';
import { authOptions } from '@pages/api/auth/[...nextauth]';

const checClient = getChecClient({ useSecretKey: false });
const sanityClient = getSanityClient({ useCdn: false, useToken: true });

/** Get authenticated user. */
const getAuthUser = async (req, res) => {
	const session = await getServerSession(req, res, authOptions);
	const { user: { email = null } = {} } = session || {};
	const isAuthenticated = !isEmpty(session) && !isEmpty(email);
	return { email, isAuthenticated };
};

/** Set cookie for cart ID. */
const setCartCookie = (req, res, cartId) => {
	if (typeof cartId === 'string' && cartId?.startsWith('cart_')) {
		const options = { req, res, httpOnly: true, sameSite: 'lax' };
		return setCookie(CART_COOKIE_KEY, cartId, options);
	}
	throw Error('Cart ID not valid');
};

/** Check if cart is expired. */
const isCartExpired = async (cartId = '') => {
	try {
		if (isEmpty(cartId)) return true;
		const cart = await checClient.request(`carts/${cartId}`);
		return !cart?.id;
	} catch (error) {
		return true;
	}
};

/**
 * Retrieves cart ID (server-side only).
 */
const retrieveCartId = async (req, res) => {
	try {
		const { email, isAuthenticated } = await getAuthUser(req, res);
		const localCartId = getCookie(CART_COOKIE_KEY, { req, res }) || null;
		const query = groq`*[_type == "user" && email == $email][0]{
    	"id": _id, cartId
  	}`;

		if (!isAuthenticated) {
			/** Get new cart Id. */
			if (await isCartExpired(localCartId)) {
				const cart = await checClient.request('carts', 'get');
				setCartCookie(req, res, cart?.id);
				return cart?.id;
			}
			return localCartId;
		}

		const user = await sanityClient.fetch(query, { email });
		const userCartId = user?.cartId;
		const localCartExpired = await isCartExpired(localCartId);
		const userCartExpired = await isCartExpired(userCartId);

		/** Local cart expired but user cart valid. */
		if (localCartExpired && !userCartExpired) {
			setCartCookie(req, res, userCartId);
			return userCartId;
		}

		/**
		 * Local cart valid but user cart expired or
		 * Both valid but not equal.
		 * */
		if ((!localCartExpired && userCartExpired) || localCartId !== userCartId) {
			await sanityClient.patch(user?.id).set({ cartId: localCartId }).commit();
			return localCartId;
		}

		/** Both expired. */
		if (localCartExpired && userCartExpired) {
			const cart = await checClient.request('carts', 'get');
			setCartCookie(req, res, cart?.id);
			await sanityClient.patch(user?.id).set({ cartId: cart?.id }).commit();
			return cart?.id;
		}

		return localCartId;
	} catch (error) {
		throw Error('Failed to retrieve cart ID.');
	}
};

export default retrieveCartId;
