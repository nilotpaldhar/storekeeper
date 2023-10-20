import { createSlice } from '@reduxjs/toolkit';
import * as actions from '@store/slices/wishlistOps/wishlistOps.thunks';
import { HTTP_STATUS } from '@constants';

const initialState = {
	status: HTTP_STATUS.idle,
	type: null,
	identifier: null,
	error: null,
};

/** Wishlist Operations(ops) Slice. */
export const wishlistOpsSlice = createSlice({
	name: 'wishlistOps',
	initialState,
	reducers: {
		resetWishlistOps: () => initialState,
	},
	extraReducers: (builder) => {
		/** Add wishlist item. */
		builder.addCase(actions.addWishlistItem.pending, (state, action) => {
			state.status = HTTP_STATUS.pending;
			state.type = 'add_wishlist_item';
			state.identifier = action.meta.arg;
		});
		builder.addCase(actions.addWishlistItem.fulfilled, (state) => {
			state.status = HTTP_STATUS.succeeded;
			state.error = null;
		});
		builder.addCase(actions.addWishlistItem.rejected, (state, action) => {
			state.status = HTTP_STATUS.failed;
			state.error = action.payload;
		});

		/** Remove wishlist item. */
		builder.addCase(actions.removeWishlistItem.pending, (state, action) => {
			state.status = HTTP_STATUS.pending;
			state.type = 'remove_wishlist_item';
			state.identifier = action.meta.arg;
		});
		builder.addCase(actions.removeWishlistItem.fulfilled, (state) => {
			state.status = HTTP_STATUS.succeeded;
			state.error = null;
		});
		builder.addCase(actions.removeWishlistItem.rejected, (state, action) => {
			state.status = HTTP_STATUS.failed;
			state.error = action.payload;
		});
	},
});

export default wishlistOpsSlice.reducer;
