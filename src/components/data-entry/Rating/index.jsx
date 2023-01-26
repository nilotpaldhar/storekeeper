import PropTypes from 'prop-types';
import { Rating as ReactRating, RoundedStar } from '@smastrom/react-rating';
import { clsx } from 'clsx';

/**
 * Render the Rating component.
 *
 * @return {Element} The Rating component.
 */
const Rating = ({
	value,
	onChange,
	starCount,
	className,
	readOnly,
	disabled,
	required,
	transition,
	...props
}) => {
	const styles = {
		itemShapes: RoundedStar,
		activeFillColor: '#FADB14',
		inactiveFillColor: '#D9D9D9',
	};

	return (
		<ReactRating
			value={value}
			onChange={onChange}
			itemStyles={styles}
			items={starCount}
			readOnly={readOnly}
			isDisabled={disabled}
			isRequired={required}
			transition={transition}
			orientation="horizontal"
			className={clsx('max-w-[100px]', className)}
			{...props}
		/>
	);
};

/**
 * Default Props.
 */
Rating.defaultProps = {
	value: 0,
	onChange: () => {},
	starCount: 5,
	className: '',
	readOnly: false,
	disabled: false,
	required: false,
	transition: 'colors',
};

/**
 * Prop Types.
 */
Rating.propTypes = {
	value: PropTypes.number,
	onChange: PropTypes.func,
	starCount: PropTypes.number,
	className: PropTypes.string,
	readOnly: PropTypes.bool,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	transition: PropTypes.oneOf(['colors', 'opacity', 'zoom', 'position']),
};

export default Rating;
