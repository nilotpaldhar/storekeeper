import { createSlice } from '@reduxjs/toolkit';
import { HTTP_STATUS } from '@constants';
import * as actions from '@store/slices/userAddress/userAddress.thunks';

const initialState = {
	status: HTTP_STATUS.idle,
	collection: [],
	error: null,
};

/** User Address Slice. */
export const userAddressSlice = createSlice({
	name: 'userAddress',
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		/** Fetch Addresses. */
		builder.addCase(actions.fetchAddresses.pending, (state) => {
			state.status = HTTP_STATUS.pending;
			state.error = null;
		});
		builder.addCase(actions.fetchAddresses.fulfilled, (state, action) => {
			state.status = HTTP_STATUS.succeeded;
			state.collection = action.payload;
		});
		builder.addCase(actions.fetchAddresses.rejected, (state, action) => {
			state.status = HTTP_STATUS.failed;
			state.error = action.payload;
		});

		/** Create Address. */
		builder.addCase(actions.createAddress.pending, (state) => {
			state.status = HTTP_STATUS.pending;
			state.error = null;
		});
		builder.addCase(actions.createAddress.fulfilled, (state, action) => {
			state.status = HTTP_STATUS.succeeded;
			state.collection.push(action.payload);
		});
		builder.addCase(actions.createAddress.rejected, (state, action) => {
			state.status = HTTP_STATUS.failed;
			state.error = action.payload;
		});

		/** Update Address. */
		builder.addCase(actions.updateAddress.pending, (state) => {
			state.status = HTTP_STATUS.pending;
			state.error = null;
		});
		builder.addCase(actions.updateAddress.fulfilled, (state, action) => {
			state.status = HTTP_STATUS.succeeded;
			const updatedId = action.payload?.id;
			state.collection = state.collection.map((address) =>
				address?.id === updatedId ? action.payload : address
			);
		});
		builder.addCase(actions.updateAddress.rejected, (state, action) => {
			state.status = HTTP_STATUS.failed;
			state.error = action.payload;
		});

		/** Delete Address. */
		builder.addCase(actions.deleteAddress.pending, (state) => {
			state.status = HTTP_STATUS.pending;
			state.error = null;
		});
		builder.addCase(actions.deleteAddress.fulfilled, (state, action) => {
			state.status = HTTP_STATUS.succeeded;
			state.collection = state.collection.filter((address) => address?.id !== action.payload);
		});
		builder.addCase(actions.deleteAddress.rejected, (state, action) => {
			state.status = HTTP_STATUS.failed;
			state.error = action.payload;
		});
	},
});

/** User Actions. */
export const { reset } = userAddressSlice.actions;

export default userAddressSlice.reducer;
