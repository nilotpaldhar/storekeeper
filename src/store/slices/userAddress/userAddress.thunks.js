import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import parseErrMsg from '@store/utils/parseErrMsg';

const BASE_URL = '/api/user/addresses';

/** Fetch list of addresses */
export const fetchAddresses = createAsyncThunk(
	'userAddress/fetchAddresses',
	async (_, { rejectWithValue }) => {
		try {
			const res = await axios.get(`${BASE_URL}`);

			const addresses = res.data?.data?.addresses;
			const pagination = res.data?.data?.meta?.pagination;

			return {
				collection: addresses ?? [],
				pagination: {
					count: pagination?.count,
					total: pagination?.total,
					totalPages: pagination?.total_pages,
					currentPage: pagination?.current_page,
					perPage: pagination?.per_page,
				},
			};
		} catch (err) {
			const message = parseErrMsg(err);
			return rejectWithValue(message || 'Failed to load addresses');
		}
	}
);

/** Fetch next set of addresses */
export const loadMoreAddresses = createAsyncThunk(
	'userAddress/loadMoreAddresses',
	async (page, { rejectWithValue }) => {
		try {
			const res = await axios.get(`${BASE_URL}?page=${page || 1}`);

			const addresses = res.data?.data?.addresses;
			const pagination = res.data?.data?.meta?.pagination;

			return {
				collection: addresses ?? [],
				pagination: {
					count: pagination?.count,
					total: pagination?.total,
					totalPages: pagination?.total_pages,
					currentPage: pagination?.current_page,
					perPage: pagination?.per_page,
				},
			};
		} catch (err) {
			const message = parseErrMsg(err);
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
			toast.success('The address has been successfully added');
			return res?.data?.data;
		} catch (err) {
			const message = parseErrMsg(err);
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
			toast.success('The address has been updated successfully');
			return res?.data?.data;
		} catch (err) {
			const message = parseErrMsg(err);
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
			toast.success('The address has been deleted successfully');
			return addressId;
		} catch (err) {
			const message = parseErrMsg(err);
			return rejectWithValue(message || 'Failed to delete address');
		}
	}
);
