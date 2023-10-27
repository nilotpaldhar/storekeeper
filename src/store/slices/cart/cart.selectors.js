import { createDraftSafeSelector } from '@reduxjs/toolkit';

export const selectCart = (state) => state.cart;

export const selectStatus = createDraftSafeSelector(selectCart, ({ status }) => status);

export const selectRequestType = createDraftSafeSelector(
	selectCart,
	({ requestType }) => requestType
);

export const selectCount = createDraftSafeSelector(selectCart, ({ count }) => count);

export const selectContents = createDraftSafeSelector(selectCart, ({ contents }) => contents);

export const selectError = createDraftSafeSelector(selectCart, ({ error }) => error);
