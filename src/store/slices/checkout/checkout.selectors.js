import { createDraftSafeSelector } from '@reduxjs/toolkit';

export const selectCheckout = (state) => state.checkout;

export const selectStatus = createDraftSafeSelector(selectCheckout, ({ status }) => status);

export const selectFulfilled = createDraftSafeSelector(
	selectCheckout,
	({ fulfilled }) => fulfilled
);

export const selectContents = createDraftSafeSelector(selectCheckout, ({ contents }) => contents);

export const selectToken = createDraftSafeSelector(selectCheckout, ({ contents }) => {
	if (!contents?.id) return null;
	return contents?.id?.split('_')[1];
});

export const selectError = createDraftSafeSelector(selectCheckout, ({ error }) => error);
