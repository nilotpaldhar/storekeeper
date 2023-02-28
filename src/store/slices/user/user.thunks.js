import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/** Fetch authenticated user. */
export const fetchAuthUser = createAsyncThunk('user/fetchAuthUser', async () => {
	const res = await axios.get('/api/user');
	return res?.data?.data;
});

/** Update user details. */
export const updateUser = createAsyncThunk('user/updateUser', async (userData) => {
	const res = await axios.put('/api/user/update', userData);
	return res?.data?.data;
});
