import { createSlice } from '@reduxjs/toolkit';
import { HTTP_STATUS } from '@constants';
import { initCheckout, placeOrder } from '@store/slices/checkout/checkout.thunks';

const initialState = {
	status: HTTP_STATUS.idle,
	fulfilled: false,
	contents: null,
	error: null,
};

/** Checkout Slice. */
export const checkoutSlice = createSlice({
	name: 'checkout',
	initialState,
	reducers: {
		fillContents: (state, action) => {
			state.contents = { ...state.contents, ...action.payload };
		},
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		/** Initiate checkout. */
		builder.addCase(initCheckout.pending, (state) => {
			state.status = HTTP_STATUS.pending;
		});
		builder.addCase(initCheckout.fulfilled, (state, action) => {
			state.status = HTTP_STATUS.succeeded;
			state.contents = action.payload;
		});
		builder.addCase(initCheckout.rejected, (state, action) => {
			state.status = HTTP_STATUS.failed;
			state.error = action.payload;
		});

		/** Place order. */
		builder.addCase(placeOrder.pending, (state) => {
			state.status = HTTP_STATUS.pending;
		});
		builder.addCase(placeOrder.fulfilled, (state) => {
			state.status = HTTP_STATUS.succeeded;
			state.fulfilled = true;
			state.contents = null;
		});
		builder.addCase(placeOrder.rejected, (state, action) => {
			state.status = HTTP_STATUS.failed;
			state.fulfilled = false;
			state.error = action.payload;
		});
	},
});

/** Checkout Actions. */
export const { fillContents, reset } = checkoutSlice.actions;

export default checkoutSlice.reducer;
