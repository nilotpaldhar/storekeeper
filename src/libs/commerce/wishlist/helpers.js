import axios from 'axios';

const BASE_URL = '/api/commerce/wishlist';

/** Get entire wishlist object (client side only). */
export const getWishlist = async () => {
	const res = await axios.get(`${BASE_URL}`);
	return res?.data?.data;
};

/** Add item to wishlist (client side only). */
export const addWishlistItem = async (id) => {
	const data = { item: id };
	const res = await axios.post(`${BASE_URL}/add`, data);
	return res?.data?.data;
};

/** Remove wishlist item (client side only). */
export const removeWishlistItem = async (id) => {
	const data = { item: id };
	const res = await axios.post(`${BASE_URL}/remove`, data);
	return res?.data?.data;
};

/** Clear wishlist contents (client side only). */
export const clearWishlist = async () => {
	const res = await axios.post(`${BASE_URL}/clear`);
	return res?.data?.data;
};
