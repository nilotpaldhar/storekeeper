import { createSlice } from '@reduxjs/toolkit';
import { HTTP_STATUS } from '@constants';
import { fetchWishlist } from '@store/slices/wishlist/wishlist.thunks';

const initialState = {
	status: HTTP_STATUS.idle,
	count: 0,
	contents: null,
	error: null,
};

/** Wishlist Slice. */
export const wishlistSlice = createSlice({
	name: 'wishlist',
	initialState,
	reducers: {
		fillWishlist: (state, action) => {
			state.count = action.payload?.totalItems;
			state.contents = action.payload;
		},
		resetWishlist: () => initialState,
	},
	extraReducers: (builder) => {
		/** Fetch wishlist */
		builder.addCase(fetchWishlist.pending, (state) => {
			state.status = HTTP_STATUS.pending;
		});
		builder.addCase(fetchWishlist.fulfilled, (state, action) => {
			state.status = HTTP_STATUS.succeeded;
			state.count = action.payload?.totalItems;
			state.contents = action.payload;
		});
		builder.addCase(fetchWishlist.rejected, (state, action) => {
			state.status = HTTP_STATUS.failed;
			state.error = action.payload;
		});
	},
});

export const { fillWishlist, resetWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
