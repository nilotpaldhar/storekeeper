"use client";

import type { CheckoutStep } from "@/types/domain.types";

import { useCheckoutStepsStore } from "@/stores/use-checkout-steps-store";

import {
	UserDetailsStep,
	AddressStep,
	DeliveryOptionsStep,
	PaymentDetailsStep,
} from "@/components/checkout/steps";
import {
	CheckoutStepsAccordion,
	CheckoutStepsAccordionPanel,
} from "@/components/checkout/steps-accordion";

const stepComponents: Record<CheckoutStep["id"], React.ComponentType<{ onSubmit: () => void }>> = {
	fill_user_details: UserDetailsStep,
	fill_address: AddressStep,
	fill_shipping_options: DeliveryOptionsStep,
	fill_payment_details: PaymentDetailsStep,
};

const CheckoutFlow = ({ onPlaceOrder }: { onPlaceOrder: () => void }) => {
	const { activeIndex, steps, goTo, next, markAsComplete, isLastStep, reset } =
		useCheckoutStepsStore();
	const activeStep = steps[activeIndex];

	const handleSubmit = (step: CheckoutStep) => {
		if (isLastStep()) {
			onPlaceOrder();
			reset();
			return;
		}

		markAsComplete(step.id);
		next();
	};

	return (
		<CheckoutStepsAccordion>
			{steps.map((step, idx) => {
				const StepComponent = stepComponents[step.id];

				return (
					<CheckoutStepsAccordionPanel
						key={step.id}
						title={step.description}
						open={step.id === activeStep.id || step.completed}
						disabled={step.id === activeStep.id || !step.completed}
						onOpenChange={() => goTo(idx)}
					>
						{StepComponent ? <StepComponent onSubmit={() => handleSubmit(step)} /> : null}
					</CheckoutStepsAccordionPanel>
				);
			})}
		</CheckoutStepsAccordion>
	);
};
export { CheckoutFlow };
