"use client";

import { useCheckoutStepsStore } from "@/stores/use-checkout-steps-store";

import { getCountryName, getStateName } from "@/lib/utils/general/location";

const AddressStepPreview = () => {
	const getStepData = useCheckoutStepsStore().getStepData;
	const { country, state, firstName, lastName, city, phone, street, zip } =
		getStepData("address") ?? {};

	const countryName = country ? getCountryName({ isoCode: country }) : null;
	const StateName =
		country && state ? getStateName({ countryCode: country, stateCode: state }) : null;

	return (
		<div className="flex flex-col space-y-2">
			<div className="space-x-1 text-sm leading-snug font-semibold">
				<span>{firstName ?? "---"}</span>
				<span>{lastName ?? "---"}</span>
				<span className="mx-1">&ndash;</span>
				<span>{phone ?? "---"}</span>
			</div>
			<div className="flex flex-wrap gap-1 text-sm leading-relaxed font-light">
				<span>{street ?? "---"}&#44;</span>
				<span>{StateName ?? "---"}&#44;</span>
				<span>{city ?? "---"}&#44;</span>
				<span>{countryName ?? "---"}</span>
				<span className="mx-1">&ndash;</span>
				<span>{zip ?? "---"}</span>
			</div>
		</div>
	);
};

export { AddressStepPreview };
