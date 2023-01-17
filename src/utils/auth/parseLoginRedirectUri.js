import isValidUrl from '@utils/general/isValidUrl';
import trimSlashes from '@utils/general/trimSlashes';
import isEmpty from 'lodash-es/isEmpty';

/** Parses redirect URI string for login. */
const parseLoginRedirectUri = (uri = null) => {
	if (isEmpty(uri)) return '/';

	/** Parse full URL (e.g http://localhost:3000/example-redirect-path?key=value). */
	if (isValidUrl(uri)) {
		const baseUrl = new URL(uri);
		const pathname = trimSlashes(baseUrl.pathname); // example-redirect-path
		const queryParams = baseUrl.search; // ?key=value
		return `/${pathname}${queryParams}`; // /example-redirect-path?key=value
	}

	return `/${trimSlashes(uri).replaceAll("'", '').trim()}`;
};

export default parseLoginRedirectUri;
