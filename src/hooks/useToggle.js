import { useState } from 'react';

const useToggle = (defaultValue) => {
	const [value, setValue] = useState(defaultValue);
	const toggle = (toggleVal) => {
		setValue((currentVal) => (typeof toggleVal === 'boolean' ? toggleVal : !currentVal));
	};
	return [value, toggle];
};

export default useToggle;
