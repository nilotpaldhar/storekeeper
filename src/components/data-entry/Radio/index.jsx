import PropTypes from 'prop-types';
import { forwardRef } from 'react';

/** Components. */
import { Root as RadixRadioRoot } from '@radix-ui/react-radio-group';
import RadioItem from '@ui/data-entry/Radio/RadioItem';
import RadioBox from '@ui/data-entry/Radio/RadioBox';

/** Component Styles. */
import styles from '@ui/data-entry/Radio/styles.cva';

/**
 * Render the Radio component.
 *
 * @return {Element} The Radio component.
 */
const Radio = forwardRef(
	(
		{
			name,
			value,
			children,
			disabled,
			required,
			className,
			orientation,
			defaultValue,
			onValueChange,
			...props
		},
		forwardedRef
	) => {
		/** Radio Config. */
		const config = {
			name,
			value,
			disabled,
			required,
			orientation,
			defaultValue,
			onValueChange,
			className: styles({
				disabled,
				className,
				orientation,
			}),
			...props,
		};

		return (
			<RadixRadioRoot ref={forwardedRef} {...config}>
				{children}
			</RadixRadioRoot>
		);
	}
);

/**
 * Sub Components.
 */
Radio.Item = RadioItem;
Radio.Box = RadioBox;

/**
 * Default Props.
 */
Radio.defaultProps = {
	name: '',
	value: undefined,
	children: '',
	disabled: false,
	required: false,
	className: '',
	orientation: 'horizontal',
	defaultValue: '',
	onValueChange: () => {},
};

/**
 * Prop Types.
 */
Radio.propTypes = {
	name: PropTypes.string,
	value: PropTypes.string,
	children: PropTypes.node,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	className: PropTypes.string,
	orientation: PropTypes.oneOf(['horizontal', 'vertical']),
	defaultValue: PropTypes.string,
	onValueChange: PropTypes.func,
};

export default Radio;
