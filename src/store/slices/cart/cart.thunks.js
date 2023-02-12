import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCart } from '@libs/commerce/cart/helpers';

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
	const contents = await getCart();
	return contents;
});

export default fetchCart;
