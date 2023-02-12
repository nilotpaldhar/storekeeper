import { createDraftSafeSelector } from '@reduxjs/toolkit';

export const selectCartOps = (state) => state.cartOps;
export const selectCartOpsStatus = createDraftSafeSelector(selectCartOps, ({ status }) => status);
export const selectCartOpsType = createDraftSafeSelector(selectCartOps, ({ type }) => type);
