import { createDraftSafeSelector } from '@reduxjs/toolkit';

export const selectUser = (state) => state.user;

export const selectUserAbout = createDraftSafeSelector(selectUser, ({ about }) => about);

export const selectUserAuthStatus = createDraftSafeSelector(
	selectUser,
	({ authStatus }) => authStatus
);
