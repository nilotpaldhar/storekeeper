import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import * as cartApi from '@libs/commerce/cart/helpers';
import parseErrMsg from '@store/utils/parseErrMsg';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
	try {
		const contents = await cartApi.getCart();
		return contents;
	} catch (err) {
		const message = parseErrMsg(err);
		return rejectWithValue(message);
	}
});

export const clearCart = createAsyncThunk('cart/clearCart', async (_, { rejectWithValue }) => {
	try {
		const contents = await cartApi.clearCart();
		return contents;
	} catch (err) {
		const message = parseErrMsg(err);
		return rejectWithValue(message);
	}
});

export const addCartDiscount = createAsyncThunk(
	'cart/addCartDiscount',
	async (discountCode, { rejectWithValue }) => {
		try {
			const contents = await cartApi.addCartDiscount(discountCode);
			toast.success('Discount code added');
			return contents;
		} catch (err) {
			const message = parseErrMsg(
				err,
				'Failed to add discount code. Please check your discount code'
			);

			toast.error(message);
			return rejectWithValue(message);
		}
	}
);

export const removeCartDiscount = createAsyncThunk(
	'cart/removeCartDiscount',
	async (_, { rejectWithValue }) => {
		try {
			const contents = await cartApi.removeCartDiscount();
			toast.success('Discount code removed');
			return contents;
		} catch (err) {
			const message = parseErrMsg(err, 'Failed to remove discount code');
			toast.error(message);
			return rejectWithValue(message);
		}
	}
);
