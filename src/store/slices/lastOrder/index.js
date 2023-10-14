import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	content: null,
};

/** Last Order Slice. */
export const lastOrderSlice = createSlice({
	name: 'lastOrder',
	initialState,
	reducers: {
		fillLastOrder: (state, action) => {
			state.content = action.payload;
		},
		reset: () => initialState,
	},
});

/** Checkout Actions. */
export const { fillLastOrder, reset } = lastOrderSlice.actions;

export default lastOrderSlice.reducer;
