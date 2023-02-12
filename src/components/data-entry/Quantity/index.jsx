import PropTypes from 'prop-types';

/** Icons. */
import PlusIcon from '@icons/regular/Plus';
import MinusIcon from '@icons/regular/Minus';
import ChevronUpIcon from '@icons/regular/ChevronUp';
import ChevronDownIcon from '@icons/regular/ChevronDown';

import useControllableState from '@hooks/useControllableState';

/** Components Styles. */
import styles, {
	inputStyles,
	btnWrapperStyles,
	btnStyles,
} from '@ui/data-entry/Quantity/styles.cva';

/**
 * Render the Rating component.
 *
 * @return {Element} The Rating component.
 */
const Quantity = ({
	defaultValue: defaultValueProp,
	min,
	max,
	controls,
	disabled,
	onChange,
	className,
	...props
}) => {
	const defaultValue = defaultValueProp === null ? 0 : defaultValueProp;
	const [value, setValue] = useControllableState({
		defaultProp: defaultValue,
		onChange,
	});

	return (
		<div className={styles({ className, disabled })} {...props}>
			<input
				readOnly
				type="text"
				tabIndex="-1"
				value={value}
				title={value}
				className={inputStyles()}
			/>
			<div className={btnWrapperStyles({ controls })}>
				<button
					type="button"
					className={btnStyles({ controls })}
					onClick={() => setValue((val) => val - 1)}
					disabled={min !== null && value <= min}
				>
					<span className="sr-only">Decrease Quantity</span>
					{controls === 'horizontal' ? (
						<MinusIcon className="!text-xs" />
					) : (
						<ChevronUpIcon className="!text-base" />
					)}
				</button>
				<button
					type="button"
					className={btnStyles({ controls })}
					onClick={() => setValue((val) => val + 1)}
					disabled={max !== null && value >= max}
				>
					<span className="sr-only">Increase Quantity</span>
					{controls === 'horizontal' ? (
						<PlusIcon className="!text-xs" />
					) : (
						<ChevronDownIcon className="!text-base" />
					)}
				</button>
			</div>
		</div>
	);
};

/**
 * Default Props.
 */
Quantity.defaultProps = {
	defaultValue: 0,
	value: undefined,
	min: 0,
	max: null,
	controls: 'horizontal',
	disabled: false,
	onChange: () => {},
	className: '',
};

/**
 * Prop Types.
 */
Quantity.propTypes = {
	defaultValue: PropTypes.number,
	value: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
	controls: PropTypes.oneOf(['horizontal', 'vertical']),
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	className: PropTypes.string,
};

export default Quantity;
