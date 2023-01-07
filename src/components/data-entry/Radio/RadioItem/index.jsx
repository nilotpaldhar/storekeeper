import { useId } from 'react';
import PropTypes from 'prop-types';

/** Components. */
import {
	Item as RadixRadioItem,
	Indicator as RadixRadioIndicator,
} from '@radix-ui/react-radio-group';

/** Component Styles. */
import styles, {
	parentStyles,
	indicatorStyles,
	labelStyles,
} from '@ui/data-entry/Radio/RadioItem/styles.cva';

/**
 * Render the RadioItem component.
 *
 * @return {Element} The RadioItem component.
 */
const RadioItem = ({
	id,
	label,
	value,
	required,
	disabled,
	labelPlacement,
	className,
	labelClassName,
	parentClassName,
	indicatorClassName,
	...props
}) => {
	const idSuffix = useId();
	const radioID = id ? `${id}-${idSuffix}` : idSuffix;

	/** Label Node. */
	const labelNode = (
		<label
			htmlFor={radioID}
			className={labelStyles({
				disabled,
				placement: labelPlacement,
				className: labelClassName,
			})}
		>
			{label}
		</label>
	);

	/** RadioItem Config. */
	const config = {
		id: radioID,
		value,
		disabled,
		required,
		className: styles({
			disabled,
			className,
		}),
		...props,
	};

	return (
		<div className={parentStyles({ className: parentClassName })}>
			{label && labelPlacement === 'left' && labelNode}
			<RadixRadioItem {...config}>
				<RadixRadioIndicator
					forceMount
					className={indicatorStyles({ disabled, className: indicatorClassName })}
				/>
			</RadixRadioItem>
			{label && labelPlacement === 'right' && labelNode}
		</div>
	);
};

/**
 * Default Props.
 */
RadioItem.defaultProps = {
	label: '',
	value: '',
	disabled: false,
	required: false,
	labelPlacement: 'right',
	className: '',
	labelClassName: '',
	parentClassName: '',
	indicatorClassName: '',
};

/**
 * Prop Types.
 */
RadioItem.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.node,
	value: PropTypes.string,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	labelPlacement: PropTypes.oneOf(['right', 'left']),
	className: PropTypes.string,
	labelClassName: PropTypes.string,
	parentClassName: PropTypes.string,
	indicatorClassName: PropTypes.string,
};

export default RadioItem;
