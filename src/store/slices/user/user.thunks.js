import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/** Fetch authenticated user. */
export const fetchAuthUser = createAsyncThunk('user/fetchAuthUser', async () => {
	const res = await axios.get('/api/user');
	return res?.data?.data;
});

export default fetchAuthUser;
