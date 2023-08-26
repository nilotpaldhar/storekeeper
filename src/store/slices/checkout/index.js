import { createSlice } from '@reduxjs/toolkit';
import { HTTP_STATUS, CHECKOUT_STEPS } from '@constants';
import { initCheckout, placeOrder } from '@store/slices/checkout/checkout.thunks';

const initialState = {
	status: HTTP_STATUS.idle,
	fulfilled: false,
	activeStep: null,
	contents: null,
	order: null,
	error: null,
};

/** Checkout Slice. */
export const checkoutSlice = createSlice({
	name: 'checkout',
	initialState,
	reducers: {
		nextStep: (state) => {
			const step = CHECKOUT_STEPS[state.activeStep?.sn];
			if (step) state.activeStep = step;
		},
		prevStep: (state) => {
			const sn = state?.activeStep?.sn;
			const step = CHECKOUT_STEPS[sn - 2];
			if (step) state.activeStep = step;
		},
		fillOrder: (state, action) => {
			state.order = { ...state.order, ...action.payload };
		},
		fillCheckoutContents: (state, action) => {
			state.contents = { ...state.contents, ...action.payload };
		},
		resetCheckout: (state) => {
			state.status = HTTP_STATUS.idle;
			state.order = null;
			state.contents = null;
			state.activeStep = null;
			state.fulfilled = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		/** Initiate checkout. */
		builder.addCase(initCheckout.pending, (state) => {
			state.status = HTTP_STATUS.pending;
		});
		builder.addCase(initCheckout.fulfilled, (state, action) => {
			state.status = HTTP_STATUS.succeeded;
			state.activeStep = CHECKOUT_STEPS[0];
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
			state.order = null;
			state.contents = null;
			state.activeStep = null;
		});
		builder.addCase(placeOrder.rejected, (state, action) => {
			state.status = HTTP_STATUS.failed;
			state.fulfilled = false;
			state.error = action.payload;
		});
	},
});

/** Checkout Actions. */
export const { nextStep, prevStep, fillOrder, fillCheckoutContents, resetCheckout } =
	checkoutSlice.actions;

export default checkoutSlice.reducer;
