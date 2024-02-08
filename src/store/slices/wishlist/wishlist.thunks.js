import { createAsyncThunk } from '@reduxjs/toolkit';
import { getWishlist, clearWishlist as clearWishlistData } from '@libs/commerce/wishlist/helpers';
import parseErrMsg from '@store/utils/parseErrMsg';

export const fetchWishlist = createAsyncThunk(
	'wishlist/fetchWishlist',
	async (_, { rejectWithValue }) => {
		try {
			const contents = await getWishlist();
			return contents;
		} catch (err) {
			const message = parseErrMsg(err);
			return rejectWithValue(message);
		}
	}
);

export const clearWishlist = createAsyncThunk(
	'wishlist/clearWishlist',
	async (_, { rejectWithValue }) => {
		try {
			const contents = await clearWishlistData();
			return contents;
		} catch (err) {
			const message = parseErrMsg(err);
			return rejectWithValue(message);
		}
	}
);
