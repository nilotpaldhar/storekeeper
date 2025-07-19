"use client";

import type { CheckoutStepProps } from "@/types/ui.types";

import { toast } from "sonner";

import { useCreateAddress } from "@/hooks/addresses";
import { useUpdateOrderAddresses } from "@/hooks/orders";

import { type CheckoutData, useCheckoutStepsStore } from "@/stores/use-checkout-steps-store";

import { AddressStepForm } from "@/components/checkout/steps/address-step/form";
import { AddressStepPreview } from "@/components/checkout/steps/address-step/preview";

import { AddressSchema } from "@/lib/schemas";

const AddressStep = ({ orderId, completed, onStepComplete }: CheckoutStepProps) => {
	const setCheckoutData = useCheckoutStepsStore().setCheckoutData;

	const createAddressMutation = useCreateAddress();
	const updateOrderAddressesMutation = useUpdateOrderAddresses();

	const isLoading = createAddressMutation.isPending || updateOrderAddressesMutation.isPending;

	const handleOnContinue = async (address: Partial<CheckoutData["address"]>) => {
		const validatedFields = AddressSchema.safeParse(address);
		if (!validatedFields.success) return;

		try {
			const newAddress = await createAddressMutation.mutateAsync(validatedFields.data);
			if (newAddress.data?.id) {
				await updateOrderAddressesMutation.mutateAsync({
					orderId,
					addressId: newAddress.data.id,
					addressType: "shipping",
					shippingAddressSameAsBilling: true,
				});
			}

			setCheckoutData("address", validatedFields.data);
			onStepComplete();
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unexpected error occurred.");
			}
		}
	};

	return (
		<div>
			{completed ? (
				<AddressStepPreview />
			) : (
				<AddressStepForm isLoading={isLoading} onContinue={handleOnContinue} />
			)}
		</div>
	);
};

export { AddressStep };
