import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCart, clearCart as clearCartData } from '@libs/commerce/cart/helpers';

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
	const contents = await getCart();
	return contents;
});

export const clearCart = createAsyncThunk('cart/clearCart', async () => {
	const contents = await clearCartData();
	return contents;
});

export default fetchCart;
