/**
 * Copies text to clipboard (Client side only).
 *
 * @param {string} str Text to copy
 *
 */
const copyTextToClipboard = async (str: string) => {
	if (!str) return false;

	try {
		if ("clipboard" in navigator) {
			await navigator.clipboard.writeText(str);
			return true;
		}
		return false;
	} catch (error) {
		return false;
	}
};

export { copyTextToClipboard };
