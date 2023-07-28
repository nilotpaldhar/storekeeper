import { createAsyncThunk } from '@reduxjs/toolkit';
import { fillCart } from '@store/slices/cart';
import * as cartApi from '@libs/commerce/cart/helpers';
import toast from 'react-hot-toast';

export const addCartItem = createAsyncThunk('cart/addCartItem', async (item, { dispatch }) => {
	const { id, quantity, options } = item ?? {};

	try {
		const cart = await cartApi.addCartItem(id, quantity, options);
		dispatch(fillCart(cart));
		toast.success('Product added to cart');
	} catch (err) {
		toast.error('Failed to add product to cart');
	}
});

export const updateCartItem = createAsyncThunk(
	'cart/updateCartItem',
	async (item, { dispatch }) => {
		const { id, quantity, options } = item ?? {};

		try {
			const cart = await cartApi.updateCartItem(id, quantity, options);
			dispatch(fillCart(cart));
		} catch (err) {
			toast.error('Failed to update cart. Please try again');
		}
	}
);

export const removeCartItem = createAsyncThunk(
	'cart/removeCartItem',
	async (itemId, { dispatch }) => {
		try {
			const cart = await cartApi.removeCartItem(itemId);
			dispatch(fillCart(cart));
			toast.success('Product removed from cart');
		} catch (err) {
			toast.error('Failed to remove product from cart');
		}
	}
);

export const addCartDiscount = createAsyncThunk(
	'cart/addCartDiscount',
	async (discountCode, { dispatch }) => {
		try {
			const cart = await cartApi.addCartDiscount(discountCode);
			dispatch(fillCart(cart));
			toast.success('Discount code added');
		} catch (err) {
			toast.error('Failed to add discount code. Please check your discount code');
		}
	}
);

export const removeCartDiscount = createAsyncThunk(
	'cart/removeCartDiscount',
	async (_, { dispatch }) => {
		try {
			const cart = await cartApi.removeCartDiscount();
			dispatch(fillCart(cart));
			toast.success('Discount code removed');
		} catch (err) {
			toast.error('Failed to remove discount code');
		}
	}
);
