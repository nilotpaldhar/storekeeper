"use client";

import { useCheckoutStepsStore } from "@/stores/use-checkout-steps-store";

const UserDetailsPreview = () => {
	const getStepData = useCheckoutStepsStore().getStepData;
	const user = getStepData("customer");

	return (
		<div className="flex flex-col space-y-1">
			<div>
				<div className="flex items-center text-sm leading-snug font-normal">
					{user.name ?? "---"}
				</div>
			</div>
			<div className="flex items-center space-x-1 text-xs">
				<span>Email:</span>
				<span>{user.email ?? "---"}</span>
			</div>
		</div>
	);
};

export { UserDetailsPreview };
