import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { HTTP_STATUS } from '@constants';
import * as actions from '@store/slices/cartOps/cartOps.thunks';

const initialState = {
	requests: {},
};

/** Cart Operations(ops) Slice. */
export const cartOpsSlice = createSlice({
	name: 'cartOps',
	initialState,
	reducers: {
		resetCartOps: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			isAnyOf(
				actions.addCartItem.pending,
				actions.updateCartItem.pending,
				actions.removeCartItem.pending,
				actions.moveToWishlist.pending
			),
			(state, action) => {
				const id = action.meta.arg?.id;
				state.requests[id] = {
					status: HTTP_STATUS.pending,
				};
			}
		);

		builder.addMatcher(
			isAnyOf(
				actions.addCartItem.fulfilled,
				actions.updateCartItem.fulfilled,
				actions.removeCartItem.fulfilled,
				actions.moveToWishlist.fulfilled
			),
			(state, action) => {
				const id = action.meta.arg?.id;
				state.requests[id] = {
					status: HTTP_STATUS.succeeded,
				};
			}
		);

		builder.addMatcher(
			isAnyOf(
				actions.addCartItem.rejected,
				actions.updateCartItem.rejected,
				actions.removeCartItem.rejected,
				actions.moveToWishlist.rejected
			),
			(state, action) => {
				const id = action.meta.arg?.id;
				state.requests[id] = {
					status: HTTP_STATUS.failed,
					error: action.payload,
				};
			}
		);
	},
});

/** Cart Operations(ops) Actions. */
export const { resetCartOps } = cartOpsSlice.actions;

export default cartOpsSlice.reducer;
