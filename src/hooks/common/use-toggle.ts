import { useState, useCallback } from "react";

/**
 * Custom hook to toggle a boolean value.
 *
 * Provides a boolean state and a function to toggle its value between `true` and `false`.
 */
const useToggle = (initialValue = true): [boolean, () => void] => {
	const [value, setValue] = useState<boolean>(initialValue);

	const toggle = useCallback(() => {
		setValue((prevValue) => !prevValue);
	}, []);

	return [value, toggle];
};

export { useToggle };
