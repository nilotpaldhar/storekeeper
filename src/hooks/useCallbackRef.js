import { useEffect, useRef, useMemo } from 'react';

/**
 * A custom hook that converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop or avoid re-executing effects when passed as a dependency.
 */
const useCallbackRef = (callback) => {
	const callbackRef = useRef(callback);
	useEffect(() => {
		callbackRef.current = callback;
	});
	return useMemo(
		() =>
			(...args) =>
				callbackRef.current?.(...args),
		[]
	);
};

export default useCallbackRef;
