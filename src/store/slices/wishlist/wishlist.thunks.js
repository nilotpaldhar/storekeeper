import { createAsyncThunk } from '@reduxjs/toolkit';
import { getWishlist } from '@libs/commerce/wishlist/helpers';

export const fetchWishlist = createAsyncThunk(
	'wishlist/fetchWishlist',
	async (_, { rejectWithValue }) => {
		try {
			const contents = await getWishlist();
			return contents;
		} catch (err) {
			const message = err?.response?.data?.error;
			return rejectWithValue(message);
		}
	}
);

export const clearWishlist = createAsyncThunk('wishlist/clearWishlist', async () => {});
