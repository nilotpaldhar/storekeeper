import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearCart } from '@libs/commerce/cart/helpers';
import { resetCart } from '@store/slices/cart';
import { fillLastOrder } from '@store/slices/lastOrder';

const BASE_URL = 'api/commerce/checkout';

export const initCheckout = createAsyncThunk(
	'checkout/initCheckout',
	async (token, { rejectWithValue }) => {
		try {
			const res = await axios.get(`${BASE_URL}/token?id=${token}`);
			return res.data?.data;
		} catch (err) {
			const message = err?.response?.data?.error;
			return rejectWithValue(message || 'Checkout error! Sorry something went wrong.');
		}
	}
);

export const placeOrder = createAsyncThunk(
	'checkout/placeOrder',
	async (_, { dispatch, getState, rejectWithValue }) => {
		const { order, contents } = getState()?.checkout ?? {};
		const items = Object.fromEntries(
			contents?.items?.map((item) => [
				item?.id,
				{
					quantity: `${item?.quantity}`,
					selected_options: Object.fromEntries(
						item?.selectedOptions?.map((option) => [option?.group?.id, option?.id])
					),
				},
			])
		);
		const data = {
			id: contents?.id,
			payload: {
				line_items: items,
				customer: order?.customer,
				billing: order?.address?.billing,
				shipping: order?.address?.shipping,
				payment: {
					gateway: 'test_gateway',
					card: {
						postal_zip_code: order?.address?.shipping?.postal_zip_code,
						...order?.payment,
					},
				},
			},
		};

		try {
			const res = await axios.post(`${BASE_URL}/order/capture`, data);
			await clearCart();
			dispatch(resetCart());
			dispatch(fillLastOrder(res.data?.data));
			return res.data?.data;
		} catch (err) {
			const message = err?.response?.data?.error;
			return rejectWithValue(message || null);
		}
	}
);
