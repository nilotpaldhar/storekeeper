import { useEffect, useRef } from 'react';

const useEventListener = (eventType, callback, element = null) => {
	if (typeof window !== 'undefined') element = window;
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		if (element === null) return undefined;
		const handler = (evt) => callbackRef.current(evt);
		element.addEventListener(eventType, handler);
		return () => element.removeEventListener(eventType, handler);
	});
};

export default useEventListener;
