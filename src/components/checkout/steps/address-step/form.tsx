"use client";

import dynamic from "next/dynamic";

import { CheckoutData, useCheckoutStepsStore } from "@/stores/use-checkout-steps-store";

import { AddressFormSkeleton } from "@/components/address/address-form";

const AddressForm = dynamic(
	() => import("@/components/address/address-form").then((mod) => mod.AddressForm),
	{ ssr: false, loading: () => <AddressFormSkeleton /> }
);

type AddressStepFormProps = {
	isLoading?: boolean;
	onContinue: (data: Partial<CheckoutData["address"]>) => void;
};

const AddressStepForm = ({ isLoading = false, onContinue }: AddressStepFormProps) => {
	const getStepData = useCheckoutStepsStore().getStepData;
	const defaultAddress = getStepData("address");

	return (
		<AddressForm
			defaultValues={defaultAddress}
			btnLabels={{ submit: isLoading ? "Continue..." : "Continue" }}
			disabled={isLoading}
			onSubmit={onContinue}
		/>
	);
};

export { AddressStepForm };
