"use client";

import type { CheckoutStepProps } from "@/types/ui.types";

import { toast } from "sonner";

import { useOrderShippingMethods, useUpdateOrderShippingMethod } from "@/hooks/orders";

import { type CheckoutData, useCheckoutStepsStore } from "@/stores/use-checkout-steps-store";

import { DeliveryOptionsForm } from "@/components/checkout/steps/delivery-options-step/form";
import { DeliveryOptionsPreview } from "@/components/checkout/steps/delivery-options-step/preview";
import { Alert } from "@/components/ui/alert";
import { ThreeDotsLoader } from "@/components/ui/loader";

const DeliveryOptionsStep = ({ orderId, completed, onStepComplete }: CheckoutStepProps) => {
	const { data, isLoading, isError, error, refetch } = useOrderShippingMethods({ id: orderId });
	const setCheckoutData = useCheckoutStepsStore().setCheckoutData;

	const updateShippingMethodMutation = useUpdateOrderShippingMethod();

	const shippingMethods = data?.data ?? [];

	const handleOnContinue = async (shippingData: Partial<CheckoutData["shipping"]>) => {
		if (!shippingData || !shippingData.id) return;

		updateShippingMethodMutation.mutate(
			{ orderId, shippingMethodId: shippingData.id },
			{
				onError: (error) => toast.error(error.message),
				onSuccess: () => {
					setCheckoutData("shipping", shippingData);
					onStepComplete();
				},
			}
		);
	};

	if (completed) {
		return <DeliveryOptionsPreview />;
	}

	if (isLoading) {
		return (
			<div className="py-20">
				<ThreeDotsLoader />
			</div>
		);
	}

	if (!isLoading && isError) {
		return (
			<Alert variant="error" closable={false}>
				<div className="flex flex-wrap items-center gap-2">
					<span className="">
						{error.message ??
							"An internal error occurred while retrieving available shipping methods."}
					</span>
					<button
						onClick={() => refetch()}
						className="text-error-600 hover:text-error-500 cursor-pointer font-bold whitespace-nowrap underline"
					>
						Try Again!
					</button>
				</div>
			</Alert>
		);
	}

	if (!isLoading && shippingMethods.length === 0) {
		return (
			<Alert variant="error" closable={false}>
				We couldn&apos;t find any shipping methods available for the address you provided. Please
				review your address details or enter a different location.
			</Alert>
		);
	}

	return (
		<DeliveryOptionsForm
			methods={shippingMethods}
			isLoading={updateShippingMethodMutation.isPending}
			onContinue={handleOnContinue}
		/>
	);
};

export { DeliveryOptionsStep };
