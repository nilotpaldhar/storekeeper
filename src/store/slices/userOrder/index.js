import { createSlice } from '@reduxjs/toolkit';
import { HTTP_STATUS } from '@constants';
import * as actions from '@store/slices/userOrder/userOrder.thunks';

const initialState = {
	status: HTTP_STATUS.idle,
	details: {},
	error: null,
};

/** User Order Slice. */
export const userOrderSlice = createSlice({
	name: 'userOrder',
	initialState,
	reducers: {
		fillOrderDetails: (state, action) => {
			state.details = action.payload;
		},
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		/** Fetch order details. */
		builder.addCase(actions.fetchOrder.pending, (state) => {
			state.status = HTTP_STATUS.pending;
			state.error = null;
		});
		builder.addCase(actions.fetchOrder.fulfilled, (state, action) => {
			state.status = HTTP_STATUS.succeeded;
			state.details = action.payload;
		});
		builder.addCase(actions.fetchOrder.rejected, (state, action) => {
			state.status = HTTP_STATUS.failed;
			state.error = action.payload;
		});
	},
});

/** User Order Actions. */
export const { fillOrderDetails, reset } = userOrderSlice.actions;

export default userOrderSlice.reducer;
