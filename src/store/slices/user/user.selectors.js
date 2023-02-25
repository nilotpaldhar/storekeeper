import { createDraftSafeSelector } from '@reduxjs/toolkit';

export const selectUser = (state) => state.user;
export const selectUserStatus = createDraftSafeSelector(selectUser, ({ status }) => status);
export const selectUserAbout = createDraftSafeSelector(selectUser, ({ about }) => about);
export const selectUserAuthStatus = createDraftSafeSelector(
	selectUser,
	({ authStatus }) => authStatus
);
