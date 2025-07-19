"use client";

import { useCheckoutStepsStore } from "@/stores/use-checkout-steps-store";

const DeliveryOptionsPreview = () => {
	const getStepData = useCheckoutStepsStore().getStepData;
	const shippingMethod = getStepData("shipping");

	return (
		<div className="flex items-center justify-between text-sm font-normal">
			<span>{shippingMethod?.name ?? "---"}</span>
			<span>{shippingMethod?.formatted_price_amount ?? "---"}</span>
		</div>
	);
};

export { DeliveryOptionsPreview };
