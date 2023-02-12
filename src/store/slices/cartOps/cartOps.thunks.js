import { createAsyncThunk } from '@reduxjs/toolkit';
import { fillCart } from '@store/slices/cart';
import * as cartApi from '@libs/commerce/cart/helpers';

export const addCartItem = createAsyncThunk('cart/addCartItem', async (item, { dispatch }) => {
	const { id, quantity, options } = item ?? {};
	const cart = await cartApi.addCartItem(id, quantity, options);
	dispatch(fillCart(cart));
});

export const updateCartItem = createAsyncThunk(
	'cart/updateCartItem',
	async (item, { dispatch }) => {
		const { id, quantity, options } = item ?? {};
		const cart = await cartApi.updateCartItem(id, quantity, options);
		dispatch(fillCart(cart));
	}
);

export const removeCartItem = createAsyncThunk(
	'cart/removeCartItem',
	async (itemId, { dispatch }) => {
		const cart = await cartApi.removeCartItem(itemId);
		dispatch(fillCart(cart));
	}
);

export const addCartDiscount = createAsyncThunk(
	'cart/addCartDiscount',
	async (discountCode, { dispatch }) => {
		const cart = await cartApi.addCartDiscount(discountCode);
		dispatch(fillCart(cart));
	}
);

export const removeCartDiscount = createAsyncThunk(
	'cart/removeCartDiscount',
	async (_, { dispatch }) => {
		const cart = await cartApi.removeCartDiscount();
		dispatch(fillCart(cart));
	}
);
