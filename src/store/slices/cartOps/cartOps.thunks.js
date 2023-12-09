import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { fillCart } from '@store/slices/cart';
import { fillWishlist } from '@store/slices/wishlist';
import * as cartApi from '@libs/commerce/cart/helpers';
import { addWishlistItem } from '@libs/commerce/wishlist/helpers';

export const addCartItem = createAsyncThunk(
	'cartOps/addCartItem',
	async (item, { dispatch, rejectWithValue }) => {
		const { id, quantity, options } = item ?? {};

		try {
			const cart = await cartApi.addCartItem(id, quantity, options);
			dispatch(fillCart(cart));
			toast.success('The product has been successfully added to your cart');
			return cart;
		} catch (err) {
			const message = err?.response?.data?.error ?? 'Failed to add product to cart';
			toast.error(message);
			return rejectWithValue(message);
		}
	}
);

export const updateCartItem = createAsyncThunk(
	'cartOps/updateCartItem',
	async (item, { dispatch, rejectWithValue }) => {
		const { id, quantity, options } = item ?? {};

		try {
			const cart = await cartApi.updateCartItem(id, quantity, options);
			dispatch(fillCart(cart));
			return cart;
		} catch (err) {
			const message = err?.response?.data?.error ?? 'Failed to update cart. Please try again';
			toast.error(message);
			return rejectWithValue(message);
		}
	}
);

export const removeCartItem = createAsyncThunk(
	'cartOps/removeCartItem',
	async (item, { dispatch, rejectWithValue }) => {
		const { id } = item ?? {};

		try {
			const cart = await cartApi.removeCartItem(id);
			dispatch(fillCart(cart));
			toast.success('The product has been removed from your cart');
			return cart;
		} catch (err) {
			const message = err?.response?.data?.error ?? 'Failed to remove product from cart';
			toast.error(message);
			return rejectWithValue(message);
		}
	}
);

export const moveToWishlist = createAsyncThunk(
	'cartOps/moveToWishlist',
	async (item, { dispatch, rejectWithValue }) => {
		const { id, sanityId } = item ?? {};

		try {
			const wishlist = await addWishlistItem(sanityId);
			dispatch(fillWishlist(wishlist));

			const cart = await cartApi.removeCartItem(id);
			dispatch(fillCart(cart));

			toast.success('The product has been moved to your wishlist');
			return cart;
		} catch (err) {
			const message = err?.response?.data?.error ?? 'Failed to move product to wishlist';
			toast.error(message);
			return rejectWithValue(message);
		}
	}
);
