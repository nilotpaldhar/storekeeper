import { Country, State } from "country-state-city";

/**
 * Returns the full country name from an ISO code (e.g., "IN" → "India")
 */
const getCountryName = ({ isoCode }: { isoCode: string }): string | null => {
	const country = Country.getCountryByCode(isoCode);
	return country?.name ?? null;
};

/**
 * Returns the full state name from a country ISO and state ISO (e.g., "IN", "AS" → "Assam")
 */
const getStateName = ({
	countryCode,
	stateCode,
}: {
	countryCode: string;
	stateCode: string;
}): string | null => {
	const state = State.getStateByCodeAndCountry(stateCode, countryCode);
	return state?.name ?? null;
};

export { getCountryName, getStateName };
