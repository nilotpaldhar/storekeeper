import { createDraftSafeSelector } from '@reduxjs/toolkit';

export const selectUserAddress = (state) => state.userAddress;

export const selectStatus = createDraftSafeSelector(selectUserAddress, ({ status }) => status);

export const selectError = createDraftSafeSelector(selectUserAddress, ({ error }) => error);

export const selectCollection = createDraftSafeSelector(
	selectUserAddress,
	({ collection }) => collection
);

export const selectDefaultShipping = createDraftSafeSelector(
	selectUserAddress,
	({ collection }) => collection?.filter((a) => a.defaultShipping)[0]
);

export const selectDefaultBilling = createDraftSafeSelector(
	selectUserAddress,
	({ collection }) => collection?.filter((a) => a.defaultBilling)[0]
);
