import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { HTTP_STATUS } from '@constants';

export const selectCartOps = (state) => state.cartOps;

export const selectRequests = createDraftSafeSelector(selectCartOps, ({ requests }) => requests);

export const selectStatus = createDraftSafeSelector(
	[(state) => state.cartOps?.requests, (_, id) => id],
	(requests, id) => requests?.[id]?.status
);

export const selectIsPending = createDraftSafeSelector(
	[(state) => state.cartOps?.requests, (_, id) => id],
	(requests, id) => requests?.[id]?.status === HTTP_STATUS.pending
);
