import { createDraftSafeSelector } from '@reduxjs/toolkit';

export const selectWishlistOps = (state) => state.wishlistOps;

export const selectStatus = createDraftSafeSelector(selectWishlistOps, ({ status }) => status);

export const selectOpsType = createDraftSafeSelector(selectWishlistOps, ({ type }) => type);

export const selectIdentifier = createDraftSafeSelector(
	selectWishlistOps,
	({ identifier }) => identifier
);

export const selectError = createDraftSafeSelector(selectWishlistOps, ({ error }) => error);
