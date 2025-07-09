/**
 * Removes trailing slash.
 */
const removeTrailingSlash = (str: string) => {
	while (str.length > 1 && str.endsWith("/")) {
		str = str.slice(0, -1);
	}
	return str;
};

export { removeTrailingSlash };
