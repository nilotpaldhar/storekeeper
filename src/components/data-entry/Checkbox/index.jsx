import { useId, forwardRef } from 'react';
import PropTypes from 'prop-types';

/** Components. */
import * as RadixCheckbox from '@radix-ui/react-checkbox';

/** Icons. */
import CheckIcon from '@icons/regular/Check';

/** Component Styles. */
import styles, {
	labelStyles,
	checkboxStyles,
	indicatorStyles,
} from '@ui/data-entry/Checkbox/styles.cva';

/**
 * Render the Checkbox component.
 *
 * @return {Element} The Checkbox component.
 */
const Checkbox = forwardRef(
	(
		{
			id,
			name,
			value,
			label,
			required,
			disabled,
			labelPlacement,
			defaultChecked,
			onCheckedChange,
			className,
			labelClassName,
			checkboxClassName,
			indicatorClassName,
			...props
		},
		forwardedRef
	) => {
		const idSuffix = useId();
		const checkboxID = id ? `${id}-${idSuffix}` : idSuffix;

		/** Label Node. */
		const labelNode = (
			<label
				htmlFor={checkboxID}
				className={labelStyles({
					disabled,
					placement: labelPlacement,
					className: labelClassName,
				})}
			>
				{label}
			</label>
		);

		/** Checkbox Root Config. */
		const config = {
			name,
			value,
			required,
			disabled,
			id: checkboxID,
			defaultChecked,
			onCheckedChange,
			className: checkboxStyles({
				disabled,
				className: checkboxClassName,
			}),
			...props,
		};

		return (
			<div className={styles({ className })}>
				{label && labelPlacement === 'left' && labelNode}
				<RadixCheckbox.Root {...config} ref={forwardedRef}>
					<RadixCheckbox.Indicator
						forceMount
						className={indicatorStyles({ className: indicatorClassName })}
					>
						<CheckIcon className="!text-xs" />
					</RadixCheckbox.Indicator>
				</RadixCheckbox.Root>
				{label && labelPlacement === 'right' && labelNode}
			</div>
		);
	}
);

/**
 * Default Props.
 */
Checkbox.defaultProps = {
	name: '',
	value: 'on',
	label: '',
	required: false,
	disabled: false,
	labelPlacement: 'right',
	defaultChecked: false,
	onCheckedChange: () => {},
	className: '',
	labelClassName: '',
	checkboxClassName: '',
	indicatorClassName: '',
};

/**
 * Prop Types.
 */
Checkbox.propTypes = {
	name: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	label: PropTypes.node,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	defaultChecked: PropTypes.bool,
	onCheckedChange: PropTypes.func,
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
	labelClassName: PropTypes.string,
	checkboxClassName: PropTypes.string,
	indicatorClassName: PropTypes.string,
	labelPlacement: PropTypes.oneOf(['right', 'left']),
};

export default Checkbox;
