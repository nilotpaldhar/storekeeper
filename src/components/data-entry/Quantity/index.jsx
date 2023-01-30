import { useState } from 'react';
import PropTypes from 'prop-types';

/** Icons. */
import PlusIcon from '@icons/regular/Plus';
import MinusIcon from '@icons/regular/Minus';
import ChevronUpIcon from '@icons/regular/ChevronUp';
import ChevronDownIcon from '@icons/regular/ChevronDown';

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
	defaultValue: defaultValueProps,
	min,
	max,
	controls,
	onChange,
	onIncrease,
	onDecrease,
	className,
	...props
}) => {
	const defaultValue = defaultValueProps === null ? 0 : defaultValueProps;
	const [value, setValue] = useState(defaultValue);

	/** Handles increase in quantity. */
	const handleIncrease = () => {
		setValue((val) => {
			const increasedVal = val + 1;
			onChange(increasedVal);
			onIncrease(increasedVal);
			return increasedVal;
		});
	};

	/** Handles decrease in quantity. */
	const handleDecrease = () => {
		setValue((val) => {
			const decreasedVal = val - 1;
			onChange(decreasedVal);
			onDecrease(decreasedVal);
			return decreasedVal;
		});
	};

	return (
		<div className={styles({ className })} {...props}>
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
					onClick={handleDecrease}
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
					onClick={handleIncrease}
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
	defaultValue: null,
	min: 0,
	max: null,
	controls: 'horizontal',
	onChange: () => {},
	onIncrease: () => {},
	onDecrease: () => {},
	className: '',
};

/**
 * Prop Types.
 */
Quantity.propTypes = {
	defaultValue: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
	controls: PropTypes.oneOf(['horizontal', 'vertical']),
	onChange: PropTypes.func,
	onIncrease: PropTypes.func,
	onDecrease: PropTypes.func,
	className: PropTypes.string,
};

export default Quantity;
