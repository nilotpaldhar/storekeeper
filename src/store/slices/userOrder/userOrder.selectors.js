import { createDraftSafeSelector } from '@reduxjs/toolkit';

export const selectUserOrder = (state) => state.userOrder;

export const selectStatus = createDraftSafeSelector(selectUserOrder, ({ status }) => status);

export const selectError = createDraftSafeSelector(selectUserOrder, ({ error }) => error);

export const selectDetails = createDraftSafeSelector(selectUserOrder, ({ details }) => details);
