import { nanoid } from 'nanoid';

/** Creates a list of credit card expiration months. */
const getExpiryMonths = () => {
	const months = Array.from({ length: 12 }, (item, i) => {
		const date = new Date(0, i);
		const full = date.toLocaleString('en-US', { month: 'long' });
		const short = date.toLocaleString('en-US', { month: 'short' });
		const twoDigit = date.toLocaleString('en-US', { month: '2-digit' });
		return { id: nanoid(), full, short, twoDigit };
	});
	return months;
};

export default getExpiryMonths;
