import { useState } from 'react';
import useEventListener from '@hooks/useEventListener';

const useWindowSize = () => {
	const isBrowser = typeof window !== 'undefined';

	const [windowSize, setWindowSize] = useState({
		width: isBrowser ? window.innerWidth : null,
		height: isBrowser ? window.innerHeight : null,
	});

	useEventListener('resize', () => {
		if (isBrowser) {
			setWindowSize({ width: window.innerWidth, height: window.innerHeight });
		}
	});

	return windowSize;
};

export default useWindowSize;
