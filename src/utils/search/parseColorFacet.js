import isEmpty from 'lodash-es/isEmpty';
import isString from 'lodash-es/isString';

/**
 * Checks if given date is expired.
 *
 * @param {string} facet Color facet string - Format[White;FFFFFF]
 */
const parseColorFacet = (facet) => {
	if (isEmpty(facet) && !isString(facet)) {
		return { name: null, code: null };
	}
	const [name, code] = facet?.split(';') ?? [];
	return { name, code };
};

export default parseColorFacet;
