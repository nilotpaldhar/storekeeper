/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = '/api/user/orders';

/** Fetch order details */
export const fetchOrder = createAsyncThunk(
	'userOrder/fetchOrder',
	async (id, { rejectWithValue }) => {
		try {
			const res = await axios.get(`${BASE_URL}/${id}`);
			return res.data?.data;
		} catch (err) {
			const message = err?.response?.data?.error;
			return rejectWithValue(message || 'Failed to load order details');
		}
	}
);
