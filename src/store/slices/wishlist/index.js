import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { HTTP_STATUS } from '@constants';
import { fetchWishlist, clearWishlist } from '@store/slices/wishlist/wishlist.thunks';

const initialState = {
	status: HTTP_STATUS.idle,
	error: null,
	count: 0,
	contents: null,
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
		builder.addMatcher(isAnyOf(fetchWishlist.pending, clearWishlist.pending), (state) => {
			state.status = HTTP_STATUS.pending;
		});

		builder.addMatcher(
			isAnyOf(fetchWishlist.fulfilled, clearWishlist.fulfilled),
			(state, action) => {
				state.status = HTTP_STATUS.succeeded;
				state.count = action.payload?.totalItems;
				state.contents = action.payload;
			}
		);

		builder.addMatcher(isAnyOf(fetchWishlist.rejected, clearWishlist.rejected), (state, action) => {
			state.status = HTTP_STATUS.failed;
			state.error = action.payload;
		});
	},
});

export const { fillWishlist, resetWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
