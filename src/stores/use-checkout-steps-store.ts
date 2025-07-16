import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { CHECKOUT_STEPS } from "@/constants/commerce";
import { CheckoutStep } from "@/types/domain.types";

type CheckoutStepsStore = {
	steps: CheckoutStep[];
	activeIndex: number;
	next: () => void;
	back: () => void;
	goTo: (index: number) => void;
	markAsComplete: (id: string) => void;
	isLastStep: () => boolean;
	reset: () => void;
};

const useCheckoutStepsStore = create<CheckoutStepsStore>()(
	immer((set, get) => ({
		steps: CHECKOUT_STEPS,
		activeIndex: 0,

		next: () =>
			set((state) => {
				if (state.activeIndex < state.steps.length - 1) {
					state.activeIndex += 1;
				}
			}),

		back: () =>
			set((state) => {
				if (state.activeIndex > 0) {
					state.activeIndex -= 1;
				}
			}),

		goTo: (index) =>
			set((state) => {
				if (index >= 0 && index < state.steps.length) {
					state.activeIndex = index;
				}
			}),

		markAsComplete: (id) =>
			set((state) => {
				const step = state.steps.find((s) => s.id === id);
				if (step) {
					step.completed = true;
				}
			}),
		isLastStep: () => get().activeIndex === get().steps.length - 1,
		reset: () =>
			set(() => ({
				steps: CHECKOUT_STEPS.map((s) => ({ ...s, completed: false })),
				activeIndex: 0,
			})),
	}))
);

export { useCheckoutStepsStore };
