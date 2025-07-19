"use client";

import type { CheckoutStepProps } from "@/types/ui.types";

import { toast } from "sonner";

import { useOrderPaymentMethods, useUpdateOrderPaymentMethod } from "@/hooks/orders";

import { CheckoutData, useCheckoutStepsStore } from "@/stores/use-checkout-steps-store";

import { PaymentDetailsForm } from "@/components/checkout/steps/payment-details-step/form";
import { PaymentDetailsPreview } from "@/components/checkout/steps/payment-details-step/preview";
import { Alert } from "@/components/ui/alert";
import { ThreeDotsLoader } from "@/components/ui/loader";

const PaymentDetailsStep = ({ orderId, completed, onStepComplete }: CheckoutStepProps) => {
	const { data, isLoading, isError, error, refetch } = useOrderPaymentMethods({ id: orderId });
	const setCheckoutData = useCheckoutStepsStore().setCheckoutData;

	const updatePaymentMethodMutation = useUpdateOrderPaymentMethod();

	const paymentMethods = data?.data ?? [];

	const handleOnContinue = async (paymentData: Partial<CheckoutData["payment"]>) => {
		if (!paymentData || !paymentData.id) return;

		updatePaymentMethodMutation.mutate(
			{ orderId, paymentMethodId: paymentData.id },
			{
				onError: (error) => toast.error(error.message),
				onSuccess: () => {
					setCheckoutData("payment", paymentData);
					onStepComplete();
				},
			}
		);
	};

	if (completed) {
		return <PaymentDetailsPreview />;
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
							"An internal error occurred while retrieving available payment methods."}
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

	if (!isLoading && paymentMethods.length === 0) {
		return (
			<Alert variant="error" closable={false}>
				We couldn&apos;t find any payment methods.
			</Alert>
		);
	}

	return (
		<PaymentDetailsForm
			methods={paymentMethods}
			isLoading={updatePaymentMethodMutation.isPending}
			onContinue={handleOnContinue}
		/>
	);
};

export { PaymentDetailsStep };
