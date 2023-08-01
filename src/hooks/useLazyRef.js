import { useRef } from 'react';

const useLazyRef = (initialValue) => {
	const ref = useRef(null);

	return function getRef() {
		if (ref.current === null) ref.current = initialValue();
		return ref.current;
	};
};

export default useLazyRef;
