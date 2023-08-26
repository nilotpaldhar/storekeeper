import { createDraftSafeSelector } from '@reduxjs/toolkit';

export const selectlastOrder = (state) => state.lastOrder;
export const selectlastOrderContent = createDraftSafeSelector(
	selectlastOrder,
	({ content }) => content
);
