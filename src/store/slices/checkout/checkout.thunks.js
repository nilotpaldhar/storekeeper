import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import formatOrder from '@utils/checkout/formatOrder';

import { clearCart } from '@store/slices/cart/cart.thunks';
import { reset as resetCheckoutSteps } from '@store/slices/checkoutSteps';
import { fillLastOrder } from '@store/slices/lastOrder';
import parseErrMsg from '@store/utils/parseErrMsg';

import { captureOrder } from '@libs/commerce/checkout/helpers';

export const initCheckout = createAsyncThunk(
	'checkout/initCheckout',
	async (token, { rejectWithValue }) => {
		try {
			const res = await axios.get(`/api/commerce/checkout/token?id=${token}`);
			return res.data?.data;
		} catch (err) {
			const message = parseErrMsg(err);
			return rejectWithValue(message || 'Checkout error! Sorry something went wrong.');
		}
	}
);

export const placeOrder = createAsyncThunk(
	'checkout/placeOrder',
	async (_, { dispatch, getState, rejectWithValue }) => {
		const contents = getState()?.checkout?.contents ?? {};
		const details = getState()?.checkoutSteps?.details ?? {};

		const data = {
			id: contents?.id,
			items: contents?.items,
			orderDetails: details,
		};

		try {
			const order = await captureOrder(data);
			const formatedOrder = await formatOrder(order);

			dispatch(clearCart());
			dispatch(fillLastOrder(formatedOrder));

			return formatedOrder;
		} catch (err) {
			const message = parseErrMsg(err);
			return rejectWithValue(message || null);
		} finally {
			dispatch(resetCheckoutSteps());
		}
	}
);
