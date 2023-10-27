import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { HTTP_STATUS } from '@constants';
import * as actions from '@store/slices/wishlistOps/wishlistOps.thunks';

const initialState = {
	requests: {},
};

/** Wishlist Operations(ops) Slice. */
export const wishlistOpsSlice = createSlice({
	name: 'wishlistOps',
	initialState,
	reducers: {
		resetWishlistOps: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			isAnyOf(actions.addWishlistItem.pending, actions.removeWishlistItem.pending),
			(state, action) => {
				const id = action.meta.arg;
				state.requests[id] = {
					status: HTTP_STATUS.pending,
				};
			}
		);

		builder.addMatcher(
			isAnyOf(actions.addWishlistItem.fulfilled, actions.removeWishlistItem.fulfilled),
			(state, action) => {
				const id = action.meta.arg;
				state.requests[id] = {
					status: HTTP_STATUS.succeeded,
				};
			}
		);

		builder.addMatcher(
			isAnyOf(actions.addWishlistItem.rejected, actions.removeWishlistItem.rejected),
			(state, action) => {
				const id = action.meta.arg;
				state.requests[id] = {
					status: HTTP_STATUS.failed,
					error: action.payload,
				};
			}
		);
	},
});

export default wishlistOpsSlice.reducer;
