import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	authStatus: 'unauthenticated',
	about: null,
};

/** User Slice. */
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		fillUser: (state, action) => {
			state.authStatus = action.payload?.status;
			state.about = action.payload?.user;
		},
		reset: () => initialState,
	},
});

/** User Actions. */
export const { fillUser, reset } = userSlice.actions;

export default userSlice.reducer;
