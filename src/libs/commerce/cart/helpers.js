import axios from 'axios';

const BASE_URL = '/api/commerce/cart';

/** Get the number of unique items in the cart (client side only). */
export const getCartCount = async () => {
	const res = await axios.get(`${BASE_URL}`);
	return res?.data?.data?.totalUniqueItems ?? 0;
};

/** Get entire cart object (client side only). */
export const getCart = async () => {
	const res = await axios.get(`${BASE_URL}`);
	return res?.data?.data ?? null;
};

/** Add item to cart (client side only). */
export const addCartItem = async (id, quantity, options = {}) => {
	const data = { id, quantity, options };
	const res = await axios.post(`${BASE_URL}/add`, data);
	return res?.data?.data ?? null;
};

/** Update cart item (client side only). */
export const updateCartItem = async (id, quantity, options = {}) => {
	const data = { itemId: id, quantity, options };
	const res = await axios.put(`${BASE_URL}/update`, data);
	return res?.data?.data ?? null;
};

/** Remove cart item (client side only). */
export const removeCartItem = async (id) => {
	const data = { itemId: id };
	const res = await axios.post(`${BASE_URL}/remove`, data);
	return res?.data?.data ?? null;
};

/** Clear cart contents(client side only). */
export const clearCart = async () => {
	const res = await axios.post(`${BASE_URL}/clear`);
	return res?.data?.data ?? null;
};

/** Add discount to cart (client side only). */
export const addCartDiscount = async (discountCode) => {
	const res = await axios.post(`${BASE_URL}/discount/add`, {
		discountCode,
	});
	return res?.data?.data ?? null;
};

/** Remove discount from cart (client side only). */
export const removeCartDiscount = async () => {
	const res = await axios.post(`${BASE_URL}/discount/remove`);
	return res?.data?.data ?? null;
};
