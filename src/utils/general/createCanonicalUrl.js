import removeTrailingSlash from '@utils/general/removeTrailingSlash';

/**
 * Create canonical URL for seo.
 *
 * @param {string} asPath
 * @param {string} domain
 *
 * @returns Canonical URL.
 */
const createCanonicalUrl = (asPath = '', domain = '') => {
	const currentLocation = typeof window !== 'undefined' ? window?.location?.origin : '';
	const baseUrl = removeTrailingSlash(domain || currentLocation);

	if (asPath === '/') return baseUrl;
	return `${baseUrl}${asPath}`.split('?')[0];
};

export default createCanonicalUrl;
