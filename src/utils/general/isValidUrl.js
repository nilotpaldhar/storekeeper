/**
 * Check if valid url.
 */
const isValidUrl = (urlStr) => {
	let url;

	try {
		url = new URL(urlStr);
	} catch (error) {
		return false;
	}

	return url?.protocol === 'http:' || url?.protocol === 'https:';
};

export default isValidUrl;
