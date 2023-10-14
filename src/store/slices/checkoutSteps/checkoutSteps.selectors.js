import { createDraftSafeSelector } from '@reduxjs/toolkit';

export const selectCheckoutSteps = (state) => state.checkoutSteps;

export const selectSteps = createDraftSafeSelector(selectCheckoutSteps, ({ steps }) => steps);

export const selectActiveIndex = createDraftSafeSelector(
	selectCheckoutSteps,
	({ activeIndex }) => activeIndex
);

export const selectActiveStep = createDraftSafeSelector(
	selectCheckoutSteps,
	({ steps, activeIndex }) => steps[activeIndex]
);

export const selectIsLastStep = createDraftSafeSelector(
	selectCheckoutSteps,
	({ steps, activeIndex }) => activeIndex === steps.length - 1
);

export const selectDetails = createDraftSafeSelector(selectCheckoutSteps, ({ details }) => details);
