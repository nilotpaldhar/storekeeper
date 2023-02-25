import { nanoid } from 'nanoid';

/** Creates a list of credit card expiration years. */
const getExpiryYears = (limit = 50) => {
	const years = Array.from({ length: limit }, (_, i) => {
		const year = new Date().getFullYear() + i;
		return {
			id: nanoid(),
			full: year,
			twoDigit: year?.toString()?.substring(2),
		};
	});
	return years;
};

export default getExpiryYears;
