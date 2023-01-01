/**
 * Removes trailing slash.
 */
const removeTrailingSlash = (str = '') => str.replace(/\/+$/, '');

export default removeTrailingSlash;
