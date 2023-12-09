import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { HTTP_STATUS } from '@constants';
import * as actions from '@store/slices/userOrders/userOrders.thunks';

const initialState = {
	status: HTTP_STATUS.idle,
	collection: [],
	pagination: {},
	error: null,
};

/** User Orders Slice. */
export const userOrdersSlice = createSlice({
	name: 'userOrders',
	initialState,
	reducers: {
		updateCollectionItem: (state, action) => {
			state.collection = state.collection.map((item) => {
				if (item?.id === action.payload?.id) {
					return action.payload;
				}
				return item;
			});
		},
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(actions.fetchOrders.fulfilled, (state, action) => {
			state.status = HTTP_STATUS.succeeded;
			state.collection = action.payload.collection;
			state.pagination = action.payload?.pagination;
		});

		builder.addCase(actions.loadMoreOrders.fulfilled, (state, action) => {
			state.status = HTTP_STATUS.succeeded;
			state.collection = [...state.collection, ...action.payload.collection];
			state.pagination = action.payload?.pagination;
		});

		builder.addMatcher(
			isAnyOf(actions.fetchOrders.pending, actions.loadMoreOrders.pending),
			(state) => {
				state.status = HTTP_STATUS.pending;
				state.error = null;
			}
		);

		builder.addMatcher(
			isAnyOf(actions.fetchOrders.rejected, actions.loadMoreOrders.rejected),
			(state, action) => {
				state.status = HTTP_STATUS.failed;
				state.error = action.payload;
			}
		);
	},
});

/** User Order Actions. */
export const { updateCollectionItem, reset } = userOrdersSlice.actions;

export default userOrdersSlice.reducer;
