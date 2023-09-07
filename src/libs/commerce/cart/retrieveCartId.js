import { getServerSession } from 'next-auth/next';
import { authOptions } from '@pages/api/auth/[...nextauth]';

import { groq } from 'next-sanity';
import getSanityClient from '@config/sanity';
import { getCartCookie, setCartCookie } from '@libs/commerce/cart/storage';

import isEmpty from 'lodash-es/isEmpty';

const sanityClient = getSanityClient({ useCdn: false, useToken: true });

/** Get authenticated user. */
const getAuthUser = async (req, res) => {
	const session = await getServerSession(req, res, authOptions);
	const { user: { email = null } = {} } = session || {};
	const isAuthenticated = !isEmpty(session) && !isEmpty(email);
	return { email, isAuthenticated };
};

/**
 * Retrieves cart ID (server-side only).
 */
const retrieveCartId = async (req, res) => {
	const localCartId = getCartCookie(req, res);

	try {
		const { email, isAuthenticated } = await getAuthUser(req, res);

		const query = groq`*[_type == "user" && email == $email][0]{
			"id": _id, cartId
		}`;

		if (!isAuthenticated) return localCartId ?? '';

		const user = await sanityClient.fetch(query, { email });
		const userCartId = user?.cartId;

		if (isEmpty(localCartId) && isEmpty(userCartId)) return '';

		if (isEmpty(localCartId) && userCartId) {
			setCartCookie(req, res, userCartId);
			return userCartId;
		}

		if (localCartId !== userCartId) {
			await sanityClient.patch(user?.id).set({ cartId: localCartId }).commit();
		}

		return localCartId;
	} catch (error) {
		throw Error('Failed to retrieve cart ID.');
	}
};

export default retrieveCartId;
