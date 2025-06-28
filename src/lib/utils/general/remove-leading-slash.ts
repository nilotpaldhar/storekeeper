/**
 * Removes all leading forward slashes from a given path string.
 *
 * Examples:
 *  "/about/mission"    → "about/mission"
 *  "//about/mission"   → "about/mission"
 *  "about/mission"     → "about/mission"
 *  "/"                 → ""
 *  "////"              → ""
 *
 * @param path - The input path string that may contain leading slashes.
 * @returns The path string without any leading slashes.
 */
const removeLeadingSlash = (path: string): string => {
	const parts = path.split("/");
	while (parts[0] === "") parts.shift();
	return parts.join("/");
};

export { removeLeadingSlash };
