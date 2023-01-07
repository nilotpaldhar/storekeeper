import { useId } from 'react';
import PropTypes from 'prop-types';

/** Components. */
import * as RadixSwitch from '@radix-ui/react-switch';

/** Component Styles. */
import styles, { labelStyles, switchStyles, thumbStyles } from '@ui/data-entry/Switch/styles.cva';

/**
 * Render the Switch component.
 *
 * @return {Element} The Switch component.
 */
const Switch = ({
	id,
	name,
	value,
	label,
	required,
	disabled,
	className,
	labelPlacement,
	thumbClassName,
	labelClassName,
	defaultChecked,
	switchClassName,
	onCheckedChange,
	...props
}) => {
	const idSuffix = useId();
	const switchID = id ? `${id}-${idSuffix}` : idSuffix;

	/** Label Node. */
	const labelNode = (
		<label
			htmlFor={switchID}
			className={labelStyles({
				disabled,
				placement: labelPlacement,
				className: labelClassName,
			})}
		>
			{label}
		</label>
	);

	/** Swith Root Config. */
	const config = {
		name,
		value,
		id: switchID,
		required,
		disabled,
		defaultChecked,
		onCheckedChange,
		className: switchStyles({
			disabled,
			className: switchClassName,
		}),
		...props,
	};

	return (
		<div className={styles({ className })}>
			{label && labelPlacement === 'left' && labelNode}
			<RadixSwitch.Root {...config}>
				<RadixSwitch.Thumb className={thumbStyles({ disabled, className: thumbClassName })} />
			</RadixSwitch.Root>
			{label && labelPlacement === 'right' && labelNode}
		</div>
	);
};

/**
 * Default Props.
 */
Switch.defaultProps = {
	name: '',
	value: 'on',
	label: '',
	className: '',
	required: false,
	disabled: false,
	thumbClassName: '',
	labelClassName: '',
	switchClassName: '',
	defaultChecked: false,
	labelPlacement: 'right',
	onCheckedChange: () => {},
};

/**
 * Prop Types.
 */
Switch.propTypes = {
	label: PropTypes.node,
	name: PropTypes.string,
	value: PropTypes.string,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	thumbClassName: PropTypes.string,
	labelClassName: PropTypes.string,
	switchClassName: PropTypes.string,
	defaultChecked: PropTypes.bool,
	onCheckedChange: PropTypes.func,
	id: PropTypes.string.isRequired,
	labelPlacement: PropTypes.oneOf(['right', 'left']),
};

export default Switch;
