import { useCallback, useEffect, useRef, useState } from "react";

import { copyTextToClipboard } from "@/lib/utils/general/copy-text-to-clipboard";

/**
 * Copies text to clipboard.
 */
const useCopy = ({ str, resetDelay = 2000 }: { str: string; resetDelay?: number }) => {
	const copyableString = useRef(str);
	const [isCopied, setIsCopied] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const copy = useCallback(async () => {
		const success = await copyTextToClipboard(copyableString.current);
		if (success) {
			setIsCopied(true);

			// Clear any existing timeout
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			// Reset isCopied after delay
			timeoutRef.current = setTimeout(() => {
				setIsCopied(false);
			}, resetDelay);
		}
	}, [resetDelay]);

	useEffect(() => {
		copyableString.current = str;
	}, [str]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return { copy, isCopied };
};

export { useCopy };
