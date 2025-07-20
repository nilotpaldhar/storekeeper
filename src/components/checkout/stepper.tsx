"use client";

import { useCheckoutStepsStore } from "@/stores/use-checkout-steps-store";

import { Stepper, StepperList, StepperItem, StepperButton } from "@/components/ui/stepper";

const CheckoutStepper = () => {
	const { activeIndex, steps, goTo } = useCheckoutStepsStore();
	const activeStep = steps[activeIndex];

	return (
		<Stepper className="flex justify-center" aria-label="Checkout Progress">
			<StepperList>
				{steps.map((step, idx) => {
					const isActive = step.id === activeStep.id;
					return (
						<StepperItem key={step.id} aria-current={isActive ? "step" : undefined}>
							<StepperButton
								active={isActive}
								disabled={!step.completed && step.id !== activeStep.id}
								onClick={() => goTo(idx)}
							>
								{step.label}
							</StepperButton>
						</StepperItem>
					);
				})}
			</StepperList>
		</Stepper>
	);
};

export { CheckoutStepper };
