import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { HTTP_STATUS } from '@constants';
import * as actions from '@store/slices/cart/cart.thunks';

export const REQUEST_TYPES = {
	FETCH_CART: 'FETCH_CART',
	CLEAR_CART: 'CLEAR_CART',
	ADD_CART_DISCOUNT: 'ADD_CART_DISCOUNT',
	REMOVE_CART_DISCOUNT: 'REMOVE_CART_DISCOUNT',
};

const initialState = {
	status: HTTP_STATUS.idle,
	requestType: null,
	error: null,
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
			state.type = null;
			state.error = null;
			state.count = count;
			state.contents = contents;
		},
		resetCart: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(actions.fetchCart.pending, (state) => {
			state.requestType = REQUEST_TYPES.FETCH_CART;
			state.status = HTTP_STATUS.pending;
		});

		builder.addCase(actions.clearCart.pending, (state) => {
			state.requestType = REQUEST_TYPES.CLEAR_CART;
			state.status = HTTP_STATUS.pending;
		});

		builder.addCase(actions.addCartDiscount.pending, (state) => {
			state.requestType = REQUEST_TYPES.ADD_CART_DISCOUNT;
			state.status = HTTP_STATUS.pending;
		});

		builder.addCase(actions.removeCartDiscount.pending, (state) => {
			state.requestType = REQUEST_TYPES.REMOVE_CART_DISCOUNT;
			state.status = HTTP_STATUS.pending;
		});

		builder.addMatcher(
			isAnyOf(
				actions.fetchCart.fulfilled,
				actions.clearCart.fulfilled,
				actions.addCartDiscount.fulfilled,
				actions.removeCartDiscount.fulfilled
			),
			(state, action) => {
				const { count, ...contents } = action.payload ?? {};
				state.status = HTTP_STATUS.succeeded;
				state.count = count;
				state.contents = contents;
			}
		);

		builder.addMatcher(
			isAnyOf(
				actions.fetchCart.rejected,
				actions.clearCart.rejected,
				actions.addCartDiscount.rejected,
				actions.removeCartDiscount.rejected
			),
			(state, action) => {
				state.status = HTTP_STATUS.failed;
				state.error = action.payload;
			}
		);
	},
});

/** Cart Actions. */
export const { fillCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
