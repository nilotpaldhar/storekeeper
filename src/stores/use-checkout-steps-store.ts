import type { AddressInput, CheckoutStep } from "@/types/domain.types";
import type { PaymentMethod, ShippingMethod } from "@commercelayer/sdk";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { CHECKOUT_STEPS } from "@/constants/commerce";

export type CheckoutData = {
	customer: {
		name: string | null;
		email: string;
	};
	address: AddressInput | null;
	shipping: ShippingMethod | null;
	payment: PaymentMethod | null;
};

type CheckoutStepsStore = {
	steps: CheckoutStep[];
	activeIndex: number;
	checkoutData: CheckoutData;
	next: () => void;
	back: () => void;
	goTo: (index: number) => void;
	markAsComplete: (id: string) => void;
	setCheckoutData: <K extends keyof CheckoutData>(key: K, value: Partial<CheckoutData[K]>) => void;
	getStepData: <K extends keyof CheckoutData>(key: K) => CheckoutData[K];
	isLastStep: () => boolean;
	reset: () => void;
};

const defaultCheckoutData: CheckoutData = {
	customer: { name: "John Doe", email: "john@example.com" },
	address: {
		firstName: "John",
		lastName: "Doe",
		phone: "+911234567890",
		street: "ABC Street",
		country: "IN",
		state: "AS",
		city: "Silchar",
		zip: "788001",
		notes: "Please handle with care",
	},
	shipping: null,
	payment: null,
};

const useCheckoutStepsStore = create<CheckoutStepsStore>()(
	immer((set, get) => ({
		steps: CHECKOUT_STEPS.map((s) => ({ ...s, completed: false })),
		activeIndex: 0,
		checkoutData: defaultCheckoutData,

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

		setCheckoutData: (key, value) =>
			set((state) => {
				state.checkoutData[key] = { ...state.checkoutData[key], ...value };
			}),

		getStepData: (key) => get().checkoutData[key],

		isLastStep: () => get().activeIndex === get().steps.length - 1,

		reset: () =>
			set(() => ({
				steps: CHECKOUT_STEPS.map((s) => ({ ...s, completed: false })),
				activeIndex: 0,
			})),
	}))
);

export { useCheckoutStepsStore };
