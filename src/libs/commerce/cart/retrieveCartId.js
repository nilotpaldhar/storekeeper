import { groq } from 'next-sanity';
import getSanityClient from '@config/sanity';
import getAuthUser from '@libs/auth/helpers/getAuthUser';
import { getCartCookie, setCartCookie } from '@libs/commerce/cart/storage';

import isEmpty from 'lodash-es/isEmpty';

const sanityClient = getSanityClient({ useCdn: false, useToken: true });

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
