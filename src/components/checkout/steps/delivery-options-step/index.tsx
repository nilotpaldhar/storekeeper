"use client";

import type { CheckoutStepProps } from "@/types/ui.types";

import { Button } from "@/components/ui/button";

const DeliveryOptionsStep = ({ completed, onStepComplete }: CheckoutStepProps) => {
	return (
		<div>
			<div className="mb-4">Delivery Options Step</div>
			{!completed ? <Button onClick={onStepComplete}>Submit</Button> : null}
		</div>
	);
};

export { DeliveryOptionsStep };
