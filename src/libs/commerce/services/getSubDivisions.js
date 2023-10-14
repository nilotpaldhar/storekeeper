import axios from 'axios';

/**
 * Fetch subdivisions based on country.
 */
const getSubDivisions = async (countryCode) => {
	try {
		const res = await axios.get(`/api/commerce/services/subdivisions?country=${countryCode}`);
		return res?.data?.data?.subdivisions ?? [];
	} catch (error) {
		return [];
	}
};

export default getSubDivisions;
