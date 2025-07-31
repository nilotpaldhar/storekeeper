import { useRef } from "react";

const useLazyRef = <T>(initialValue: () => T): (() => T) => {
	const ref = useRef<T | null>(null);

	return function getRef() {
		if (ref.current === null) {
			ref.current = initialValue();
		}
		return ref.current;
	};
};

export { useLazyRef };
