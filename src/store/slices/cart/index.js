import { createSlice } from '@reduxjs/toolkit';
import { HTTP_STATUS } from '@constants';
import { fetchCart, clearCart } from '@store/slices/cart/cart.thunks';

const initialState = {
	status: HTTP_STATUS.idle,
	count: 0,
	contents: null,
};

/** Cart Slice. */
export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		fillCart: (state, action) => {
			const { count, ...contents } = action.payload ?? {};
			state.count = count;
			state.contents = contents;
		},
		resetCart: () => initialState,
	},
	extraReducers: (builder) => {
		/** Fetch cart */
		builder.addCase(fetchCart.pending, (state) => {
			state.status = HTTP_STATUS.pending;
		});
		builder.addCase(fetchCart.fulfilled, (state, action) => {
			const { count, ...contents } = action.payload ?? {};
			state.status = HTTP_STATUS.succeeded;
			state.count = count;
			state.contents = contents;
		});
		builder.addCase(fetchCart.rejected, (state) => {
			state.status = HTTP_STATUS.failed;
		});

		/** Clear cart */
		builder.addCase(clearCart.pending, (state) => {
			state.status = HTTP_STATUS.pending;
		});
		builder.addCase(clearCart.fulfilled, (state, action) => {
			const { count, ...contents } = action.payload ?? {};
			state.status = HTTP_STATUS.succeeded;
			state.count = count;
			state.contents = contents;
		});
		builder.addCase(clearCart.rejected, (state) => {
			state.status = HTTP_STATUS.failed;
		});
	},
});

/** Cart Actions. */
export const { fillCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
