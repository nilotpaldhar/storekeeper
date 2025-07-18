"use client";

import type { CheckoutStepProps } from "@/types/ui.types";

import { Button } from "@/components/ui/button";

const PaymentDetailsStep = ({ completed, onStepComplete }: CheckoutStepProps) => {
	return (
		<div>
			<div className="mb-4">Payment Details Step</div>
			{!completed ? <Button onClick={onStepComplete}>Submit</Button> : null}
		</div>
	);
};

export { PaymentDetailsStep };
