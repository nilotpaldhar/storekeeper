import { createDraftSafeSelector } from '@reduxjs/toolkit';

export const selectCheckout = (state) => state.checkout;
export const selectCheckoutStatus = createDraftSafeSelector(selectCheckout, ({ status }) => status);
export const selectCheckoutFulfilled = createDraftSafeSelector(
	selectCheckout,
	({ fulfilled }) => fulfilled
);
export const selectCheckoutContents = createDraftSafeSelector(
	selectCheckout,
	({ contents }) => contents
);
export const selectCheckoutOrder = createDraftSafeSelector(selectCheckout, ({ order }) => order);
export const selectCheckoutActiveStep = createDraftSafeSelector(
	selectCheckout,
	({ activeStep }) => activeStep
);
export const selectCheckoutError = createDraftSafeSelector(selectCheckout, ({ error }) => error);
