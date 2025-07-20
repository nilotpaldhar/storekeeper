"use client";

import type { CheckoutStep } from "@/types/domain.types";
import type { CheckoutStepProps } from "@/types/ui.types";

import { ClipboardCheck } from "lucide-react";
import { Fragment } from "react";

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
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils/general/cn";

type CheckoutFlowProps = {
	orderId: string;
	onPlaceOrder: () => void;
};

const stepComponents: Record<CheckoutStep["id"], React.ComponentType<CheckoutStepProps>> = {
	user_info: UserDetailsStep,
	shipping_address: AddressStep,
	shipping_method: DeliveryOptionsStep,
	payment_method: PaymentDetailsStep,
};

const CheckoutFlow = ({ orderId, onPlaceOrder }: CheckoutFlowProps) => {
	const { activeIndex, steps, goTo, next, markAsComplete, isLastStep } = useCheckoutStepsStore();
	const activeStep = steps[activeIndex];

	const handleStepComplete = (step: CheckoutStep) => {
		if (isLastStep()) {
			onPlaceOrder();
			return;
		}
		markAsComplete(step.id);
		next();
	};

	return (
		<CheckoutStepsAccordion>
			{steps.map((step, idx) => {
				const StepComponent = stepComponents[step.id];
				const isLastStep = idx === steps.length - 1;

				return (
					<Fragment key={step.id}>
						{isLastStep ? (
							<Button
								onClick={() => handleStepComplete(step)}
								className={cn("w-full", step.id !== activeStep.id && "hidden")}
							>
								<ClipboardCheck />
								<span>{step.description}</span>
							</Button>
						) : (
							<CheckoutStepsAccordionPanel
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
						)}
					</Fragment>
				);
			})}
		</CheckoutStepsAccordion>
	);
};
export { CheckoutFlow };
