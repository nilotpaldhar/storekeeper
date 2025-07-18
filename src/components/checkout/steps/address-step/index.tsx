"use client";

import type { CheckoutStepProps } from "@/types/ui.types";

import { Button } from "@/components/ui/button";

const AddressStep = ({ completed, onStepComplete }: CheckoutStepProps) => {
	return (
		<div>
			<div className="mb-4">Address Step</div>
			{!completed ? <Button onClick={onStepComplete}>Submit</Button> : null}
		</div>
	);
};

export { AddressStep };
