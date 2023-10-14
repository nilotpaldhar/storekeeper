import { createSlice } from '@reduxjs/toolkit';
import { CHECKOUT_STEPS } from '@constants';

const initialState = {
	steps: CHECKOUT_STEPS,
	activeIndex: 0,
	details: null,
};

/** Checkout Steps Slice. */
export const checkoutStepsSlice = createSlice({
	name: 'checkoutSteps',
	initialState,
	reducers: {
		next: (state) => {
			if (state.activeIndex >= state.steps.length - 1) return;
			state.activeIndex += 1;
		},
		back: (state) => {
			if (state.activeIndex <= 0) return;
			state.activeIndex -= 1;
		},
		goTo: (state, action) => {
			state.activeIndex = action.payload;
		},
		markAsComplete: (state, action) => {
			const step = state.steps.find(({ id }) => id === action.payload);
			if (step) step.completed = true;
		},
		fillDetails: (state, action) => {
			state.details = { ...state.details, ...action.payload };
		},
		reset: () => initialState,
	},
});

/** Checkout Steps Actions. */
export const { back, next, goTo, markAsComplete, fillDetails, reset } = checkoutStepsSlice.actions;

export default checkoutStepsSlice.reducer;
