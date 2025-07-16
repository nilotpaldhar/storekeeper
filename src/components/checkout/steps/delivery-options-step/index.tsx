"use client";

import { Button } from "@/components/ui/button";

const DeliveryOptionsStep = ({ onSubmit }: { onSubmit: () => void }) => {
	return (
		<div>
			<div className="mb-4">Delivery Options Step</div>
			<Button onClick={onSubmit}>Submit</Button>
		</div>
	);
};

export { DeliveryOptionsStep };
