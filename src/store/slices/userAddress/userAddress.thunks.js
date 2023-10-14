import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = '/api/user/addresses';

/** Fetch list of addresses */
export const fetchAddresses = createAsyncThunk(
	'userAddress/fetchAddresses',
	async (_, { rejectWithValue }) => {
		try {
			const res = await axios.get(`${BASE_URL}`);
			return res.data?.data?.addresses ?? [];
		} catch (err) {
			const message = err?.response?.data?.error;
			return rejectWithValue(message || 'Failed to load addresses');
		}
	}
);

/** Create an address */
export const createAddress = createAsyncThunk(
	'userAddress/createAddress',
	async (payload, { rejectWithValue }) => {
		try {
			const res = await axios.post(`${BASE_URL}`, { payload });
			return res?.data?.data;
		} catch (err) {
			const message = err?.response?.data?.error;
			return rejectWithValue(message || 'Failed to create address');
		}
	}
);

/** Update an address */
export const updateAddress = createAsyncThunk(
	'userAddress/updateAddresses',
	async ({ addressId, payload }, { rejectWithValue }) => {
		try {
			const res = await axios.put(`${BASE_URL}/${addressId}`, { payload });
			return res?.data?.data;
		} catch (err) {
			const message = err?.response?.data?.error;
			return rejectWithValue(message || 'Failed to update address');
		}
	}
);

/** Delete an address */
export const deleteAddress = createAsyncThunk(
	'userAddress/deleteAddress',
	async (addressId, { rejectWithValue }) => {
		try {
			await axios.delete(`${BASE_URL}/${addressId}`);
			return addressId;
		} catch (err) {
			const message = err?.response?.data?.error;
			return rejectWithValue(message || 'Failed to delete address');
		}
	}
);
