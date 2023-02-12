import { useEffect, useState, useRef, useCallback } from 'react';
import useCallbackRef from '@hooks/useCallbackRef';

const useUncontrolledState = ({ defaultProp, onChange }) => {
	const uncontrolledState = useState(defaultProp);
	const [value] = uncontrolledState;
	const prevValueRef = useRef(value);
	const handleChange = useCallbackRef(onChange);

	useEffect(() => {
		if (prevValueRef.current !== value) {
			handleChange(value);
			prevValueRef.current = value;
		}
	}, [value, prevValueRef, handleChange]);

	return uncontrolledState;
};

/**
 * A custom hook that allows any component handle controlled and uncontrolled modes,
 * and provide control over its internal state.
 */
const useControllableState = ({ prop, defaultProp, onChange = () => {} }) => {
	const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({ defaultProp, onChange });
	const isControlled = prop !== undefined;
	const value = isControlled ? prop : uncontrolledProp;
	const handleChange = useCallbackRef(onChange);

	const setValue = useCallback(
		(nextValue) => {
			if (isControlled) {
				const setter = nextValue;
				const val = typeof nextValue === 'function' ? setter(prop) : nextValue;
				if (val !== prop) handleChange(val);
			} else {
				setUncontrolledProp(nextValue);
			}
		},
		[isControlled, prop, setUncontrolledProp, handleChange]
	);

	return [value, setValue];
};

export default useControllableState;
