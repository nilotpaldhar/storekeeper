"use client";

import { Button } from "@/components/ui/button";

const UserDetailsStep = ({ onSubmit }: { onSubmit: () => void }) => {
	return (
		<div>
			<div className="mb-4">User Details Step</div>
			<Button onClick={onSubmit}>Submit</Button>
		</div>
	);
};

export { UserDetailsStep };
