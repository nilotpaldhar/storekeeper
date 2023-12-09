import { createDraftSafeSelector } from '@reduxjs/toolkit';

export const selectUserOrders = (state) => state.userOrders;

export const selectStatus = createDraftSafeSelector(selectUserOrders, ({ status }) => status);

export const selectError = createDraftSafeSelector(selectUserOrders, ({ error }) => error);

export const selectCollection = createDraftSafeSelector(
	selectUserOrders,
	({ collection }) => collection
);

export const selectPagination = createDraftSafeSelector(
	selectUserOrders,
	({ pagination }) => pagination
);
