import PropTypes from 'prop-types';
import clsx from 'clsx';
import { GoArrowUpLeft } from 'react-icons/go';

/**
 * Render the ArrowUpLeft icon.
 *
 * @return {Element} The ArrowUpLeft icon.
 */
const ArrowUpLeft = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<GoArrowUpLeft />
	</span>
);

/**
 * Default Props.
 */
ArrowUpLeft.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
ArrowUpLeft.propTypes = {
	className: PropTypes.string,
};

export default ArrowUpLeft;
