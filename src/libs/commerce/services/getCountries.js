import axios from 'axios';

/**
 * Fetch list of countries.
 */
const getCountries = async () => {
	try {
		const res = await axios.get('/api/commerce/services/countries');
		return res?.data?.data?.countries ?? [];
	} catch (error) {
		return [];
	}
};

export default getCountries;
