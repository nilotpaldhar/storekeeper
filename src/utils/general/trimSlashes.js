/**
 * Removes slashes from string.
 */
const trimSlashes = (str = '') => {
	if (!str) return null;
	return str
		.split('/')
		.filter((i) => i !== '')
		.join('/');
};

export default trimSlashes;
