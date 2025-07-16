"use client";

import { Button } from "@/components/ui/button";

const PaymentDetailsStep = ({ onSubmit }: { onSubmit: () => void }) => {
	return (
		<div>
			<div className="mb-4">Payment Details Step</div>
			<Button onClick={onSubmit}>Submit</Button>
		</div>
	);
};

export { PaymentDetailsStep };
