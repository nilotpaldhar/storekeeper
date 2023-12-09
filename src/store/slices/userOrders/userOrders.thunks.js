import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = '/api/user/orders';

/** Fetch list of orders */
export const fetchOrders = createAsyncThunk(
	'userOrders/fetchOrders',
	async (_, { rejectWithValue }) => {
		try {
			const res = await axios.get(`${BASE_URL}`);

			const orders = res.data?.data?.orders;
			const pagination = res.data?.data?.meta?.pagination;

			return {
				collection: orders ?? [],
				pagination: {
					count: pagination?.count,
					total: pagination?.total,
					totalPages: pagination?.total_pages,
					currentPage: pagination?.current_page,
					perPage: pagination?.per_page,
				},
			};
		} catch (err) {
			const message = err?.response?.data?.error;
			return rejectWithValue(message || 'Failed to load orders');
		}
	}
);

/** Fetch next set of orders */
export const loadMoreOrders = createAsyncThunk(
	'userOrders/loadMoreOrders',
	async (page, { rejectWithValue }) => {
		try {
			const res = await axios.get(`${BASE_URL}?page=${page || 1}`);

			const orders = res.data?.data?.orders;
			const pagination = res.data?.data?.meta?.pagination;

			return {
				collection: orders ?? [],
				pagination: {
					count: pagination?.count,
					total: pagination?.total,
					totalPages: pagination?.total_pages,
					currentPage: pagination?.current_page,
					perPage: pagination?.per_page,
				},
			};
		} catch (err) {
			const message = err?.response?.data?.error;
			return rejectWithValue(message || 'Failed to load orders');
		}
	}
);
