"use client";

import type { CheckoutStep } from "@/types/domain.types";
import type { CheckoutStepProps } from "@/types/ui.types";

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

type CheckoutFlowProps = {
	orderId: string;
	onPlaceOrder: () => void;
};

const stepComponents: Record<CheckoutStep["id"], React.ComponentType<CheckoutStepProps>> = {
	fill_user_details: UserDetailsStep,
	fill_address: AddressStep,
	fill_shipping_options: DeliveryOptionsStep,
	fill_payment_details: PaymentDetailsStep,
};

const CheckoutFlow = ({ orderId, onPlaceOrder }: CheckoutFlowProps) => {
	const { activeIndex, steps, goTo, next, markAsComplete, isLastStep, reset } =
		useCheckoutStepsStore();
	const activeStep = steps[activeIndex];

	const handleStepComplete = (step: CheckoutStep) => {
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
						{StepComponent ? (
							<StepComponent
								orderId={orderId}
								completed={step.id !== activeStep.id && step.completed}
								onStepComplete={() => handleStepComplete(step)}
							/>
						) : null}
					</CheckoutStepsAccordionPanel>
				);
			})}
		</CheckoutStepsAccordion>
	);
};
export { CheckoutFlow };
