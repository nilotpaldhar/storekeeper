import { createDraftSafeSelector } from '@reduxjs/toolkit';

export const selectCart = (state) => state.cart;
export const selectCartStatus = createDraftSafeSelector(selectCart, ({ status }) => status);
export const selectCartCount = createDraftSafeSelector(selectCart, ({ count }) => count);
export const selectCartContents = createDraftSafeSelector(selectCart, ({ contents }) => contents);
