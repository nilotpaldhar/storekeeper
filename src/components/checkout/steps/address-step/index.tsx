"use client";

import { Button } from "@/components/ui/button";

const AddressStep = ({ onSubmit }: { onSubmit: () => void }) => {
	return (
		<div>
			<div className="mb-4">Address Step</div>
			<Button onClick={onSubmit}>Submit</Button>
		</div>
	);
};

export { AddressStep };
