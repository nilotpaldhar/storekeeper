import { createSlice } from '@reduxjs/toolkit';
import { HTTP_STATUS } from '@constants';
import { fetchAuthUser } from '@store/slices/user/user.thunks';

const initialState = {
	status: HTTP_STATUS.idle,
	authStatus: 'unauthenticated',
	about: null,
};

/** User Slice. */
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAuthUser.pending, (state) => {
			state.status = HTTP_STATUS.pending;
		});
		builder.addCase(fetchAuthUser.fulfilled, (state, action) => {
			state.status = HTTP_STATUS.succeeded;
			state.authStatus = 'authenticated';
			state.about = action?.payload;
		});
		builder.addCase(fetchAuthUser.rejected, (state) => {
			state.status = HTTP_STATUS.failed;
			state.authStatus = 'unauthenticated';
			state.about = null;
		});
	},
});

/** User Actions. */
// export const {} = userSlice.actions;

export default userSlice.reducer;
