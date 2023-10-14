import isNumber from 'lodash-es/isNumber';

/**
 * Validates credit/debit card number using "Luhn Algorithm".
 *
 * See https://www.geeksforgeeks.org/luhn-algorithm
 */
export const validateCardNum = (input = '') => {
	const creditCardInt = `${input}`?.split('')?.map(Number);
	let total = 0;

	if (!isNumber(creditCardInt[0])) return false;

	for (let i = creditCardInt.length - 2; i >= 0; i -= 2) {
		let temp = creditCardInt[i];
		temp *= 2;
		if (temp > 9) temp = (temp % 10) + 1;
		creditCardInt[i] = temp;
	}

	for (let i = 0; i < creditCardInt.length; i += 1) {
		total += creditCardInt[i];
	}

	return total % 10 === 0;
};

/**
 * Validates credit/debit card expiry date.
 */
export const validateCardExpiry = (expMonth, expYear) => {
	if (!expMonth || !expYear) return false;

	/** Get current month and year */
	const today = new Date();
	const currMonth = today.getMonth() + 1;
	const currYear = today.getFullYear();

	if (expYear < currYear) return false;
	if (expMonth < currMonth && expYear <= currYear) return false;
	return true;
};
