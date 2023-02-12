import { createSlice } from '@reduxjs/toolkit';
import { HTTP_STATUS } from '@constants';
import {
	addCartItem,
	updateCartItem,
	removeCartItem,
	addCartDiscount,
	removeCartDiscount,
} from '@store/slices/cartOps/cartOps.thunks';

const initialState = {
	status: HTTP_STATUS.idle,
	type: null,
};

/** Cart Operations(ops) Slice. */
export const cartOpsSlice = createSlice({
	name: 'cartOps',
	initialState,
	reducers: {
		resetCartOps: (state) => {
			state.status = HTTP_STATUS.idle;
			state.type = null;
		},
	},
	extraReducers: (builder) => {
		/** Add cart item. */
		builder.addCase(addCartItem.pending, (state) => {
			state.status = HTTP_STATUS.pending;
			state.type = 'add_cart_item';
		});
		builder.addCase(addCartItem.fulfilled, (state) => {
			state.status = HTTP_STATUS.succeeded;
		});
		builder.addCase(addCartItem.rejected, (state) => {
			state.status = HTTP_STATUS.failed;
		});

		/** Update cart item. */
		builder.addCase(updateCartItem.pending, (state) => {
			state.status = HTTP_STATUS.pending;
			state.type = 'update_cart_item';
		});
		builder.addCase(updateCartItem.fulfilled, (state) => {
			state.status = HTTP_STATUS.succeeded;
		});
		builder.addCase(updateCartItem.rejected, (state) => {
			state.status = HTTP_STATUS.failed;
		});

		/** Remove cart item. */
		builder.addCase(removeCartItem.pending, (state) => {
			state.status = HTTP_STATUS.pending;
			state.type = 'remove_cart_item';
		});
		builder.addCase(removeCartItem.fulfilled, (state) => {
			state.status = HTTP_STATUS.succeeded;
		});
		builder.addCase(removeCartItem.rejected, (state) => {
			state.status = HTTP_STATUS.failed;
		});

		/** Add discount to cart. */
		builder.addCase(addCartDiscount.pending, (state) => {
			state.status = HTTP_STATUS.pending;
			state.type = 'add_cart_discount';
		});
		builder.addCase(addCartDiscount.fulfilled, (state) => {
			state.status = HTTP_STATUS.succeeded;
		});
		builder.addCase(addCartDiscount.rejected, (state) => {
			state.status = HTTP_STATUS.failed;
		});

		/** Remove discount from cart. */
		builder.addCase(removeCartDiscount.pending, (state) => {
			state.status = HTTP_STATUS.pending;
			state.type = 'remove_cart_discount';
		});
		builder.addCase(removeCartDiscount.fulfilled, (state) => {
			state.status = HTTP_STATUS.succeeded;
		});
		builder.addCase(removeCartDiscount.rejected, (state) => {
			state.status = HTTP_STATUS.failed;
		});
	},
});

/** Cart Operations(ops) Actions. */
export const { resetCartOps } = cartOpsSlice.actions;

export default cartOpsSlice.reducer;
