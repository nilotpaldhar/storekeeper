import isBefore from 'date-fns/isBefore';

/**
 * Checks if given date is expired.
 *
 * @param {string} date A valid ISO date string.
 */
const isDateExpired = (date = '') => {
	const dateToCompare = new Date(date);
	const currentDate = new Date();
	return isBefore(dateToCompare, currentDate);
};

export default isDateExpired;
