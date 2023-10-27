import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { HTTP_STATUS } from '@constants';

export const selectWishlistOps = (state) => state.wishlistOps;

export const selectRequests = createDraftSafeSelector(
	selectWishlistOps,
	({ requests }) => requests
);

export const selectStatus = createDraftSafeSelector(
	[(state) => state.wishlistOps?.requests, (_, id) => id],
	(requests, id) => requests?.[id]?.status
);

export const selectIsPending = createDraftSafeSelector(
	[(state) => state.wishlistOps?.requests, (_, id) => id],
	(requests, id) => requests?.[id]?.status === HTTP_STATUS.pending
);
