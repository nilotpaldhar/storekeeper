import { useId } from 'react';
import PropTypes from 'prop-types';
import { Item as RadixRadioItem } from '@radix-ui/react-radio-group';
import styles from '@ui/data-entry/Radio/RadioBox/styles.cva';

/**
 * Render the RadioBox component.
 *
 * @return {Element} The RadioBox component.
 */
const RadioBox = ({ id, value, children, required, disabled, className, ...props }) => {
	const idSuffix = useId();
	const radioID = id ? `${id}-${idSuffix}` : idSuffix;

	return (
		<RadixRadioItem
			id={radioID}
			value={value}
			disabled={disabled}
			required={required}
			className={styles({ disabled, className })}
			{...props}
		>
			{children}
		</RadixRadioItem>
	);
};

/**
 * Default Props.
 */
RadioBox.defaultProps = {
	value: '',
	children: '',
	disabled: false,
	required: false,
	className: '',
};

/**
 * Prop Types.
 */
RadioBox.propTypes = {
	id: PropTypes.string.isRequired,
	value: PropTypes.string,
	children: PropTypes.node,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	className: PropTypes.string,
};

export default RadioBox;
