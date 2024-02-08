import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { fillWishlist } from '@store/slices/wishlist';
import parseErrMsg from '@store/utils/parseErrMsg';
import * as wishlistApi from '@libs/commerce/wishlist/helpers';

export const addWishlistItem = createAsyncThunk(
	'wishlistOps/addWishlistItem',
	async (itemId, { dispatch, rejectWithValue }) => {
		try {
			const wishlist = await wishlistApi.addWishlistItem(itemId);
			dispatch(fillWishlist(wishlist));
			toast.success('The product has been successfully added to your wishlist');
			return wishlist;
		} catch (err) {
			const message = parseErrMsg(err, 'Failed to add product to wishlist');
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
			toast.success('The product has been removed from your wishlist');
			return wishlist;
		} catch (err) {
			const message = parseErrMsg(err, 'Failed to remove product from wishlist');
			toast.error(message);
			return rejectWithValue(message);
		}
	}
);
