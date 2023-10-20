import { createAsyncThunk } from '@reduxjs/toolkit';
import { fillWishlist } from '@store/slices/wishlist';
import * as wishlistApi from '@libs/commerce/wishlist/helpers';
import toast from 'react-hot-toast';

export const addWishlistItem = createAsyncThunk(
	'wishlistOps/addWishlistItem',
	async (itemId, { dispatch, rejectWithValue }) => {
		try {
			const wishlist = await wishlistApi.addWishlistItem(itemId);
			dispatch(fillWishlist(wishlist));
			toast.success('Product added to wishlist');
			return wishlist;
		} catch (err) {
			const message = err?.response?.data?.error ?? 'Failed to add product to wishlist';
			toast.error(message);
			return rejectWithValue(message);
		}
	}
);

export const removeWishlistItem = createAsyncThunk(
	'wishlistOps/removeWishlistItem',
	async (itemId, { dispatch, rejectWithValue }) => {
		try {
			const wishlist = await wishlistApi.removeWishlistItem(itemId);
			dispatch(fillWishlist(wishlist));
			toast.success('Product removed from wishlist');
			return wishlist;
		} catch (err) {
			const message = err?.response?.data?.error ?? 'Failed to remove product from wishlist';
			toast.error(message);
			return rejectWithValue(message);
		}
	}
);
