"use client";

import { useCheckoutStepsStore } from "@/stores/use-checkout-steps-store";

const PaymentDetailsPreview = () => {
	const getStepData = useCheckoutStepsStore().getStepData;
	const paymentMethod = getStepData("payment");

	return (
		<div className="flex items-center justify-between text-sm font-normal">
			<span>{paymentMethod?.name ?? "---"}</span>
			<span>{paymentMethod?.formatted_price_amount ?? "---"}</span>
		</div>
	);
};

export { PaymentDetailsPreview };
