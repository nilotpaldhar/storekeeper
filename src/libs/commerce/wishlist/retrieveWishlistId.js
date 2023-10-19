import { groq } from 'next-sanity';
import client from '@config/sanity';
import isEmpty from 'lodash-es/isEmpty';

import getAuthUser from '@libs/auth/helpers/getAuthUser';
import { getWishlistCookie, setWishlistCookie } from '@libs/commerce/wishlist/storage';

/**
 * Retrieves wishlist ID (server-side only).
 */
const retrieveWishlistId = async (req, res) => {
	const localWishlistId = getWishlistCookie(req, res);
	const sanity = client({ useCdn: false, useToken: true });

	try {
		const { email, isAuthenticated } = await getAuthUser(req, res);

		const query = groq`*[_type == "user" && email == $email][0]{
			"id": _id, wishlistId
		}`;

		if (!isAuthenticated) return localWishlistId ?? '';

		const user = await sanity.fetch(query, { email });
		const userWishlistId = user?.wishlistId;

		if (isEmpty(localWishlistId) && isEmpty(userWishlistId)) return '';

		if (isEmpty(localWishlistId) && userWishlistId) {
			setWishlistCookie(req, res, userWishlistId);
			return userWishlistId;
		}

		if (localWishlistId !== userWishlistId) {
			await sanity.patch(user?.id).set({ wishlistId: localWishlistId }).commit();
		}

		return localWishlistId;
	} catch (error) {
		throw Error('Failed to retrieve wishlist ID.');
	}
};

export default retrieveWishlistId;
