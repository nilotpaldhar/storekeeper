import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

/**
 * Render the MaskInput component.
 *
 * @return {Element} The MaskInput component.
 */
const MaskInput = forwardRef(({ mask, unmask, rootProps, onChange, ...props }, forwardedRef) => {
	const [value, setValue] = useState('');

	const handleAccept = (val) => {
		setValue(val);
		onChange(val);
	};

	return (
		<IMaskInput
			{...props}
			unmask
			mask={mask}
			value={value}
			onAccept={handleAccept}
			className="form-input"
			inputRef={forwardedRef}
		/>
	);
});

/**
 * Default Props.
 */
MaskInput.defaultProps = {
	mask: '',
	unmask: true,
	rootProps: {},
	onChange: () => {},
};

/**
 * Prop Types.
 */
MaskInput.propTypes = {
	mask: PropTypes.string,
	unmask: PropTypes.bool,
	rootProps: PropTypes.shape({}),
	onChange: PropTypes.func,
};

export default MaskInput;
