import PropTypes from 'prop-types';
import clsx from 'clsx';
import { GoArrowUpRight } from 'react-icons/go';

/**
 * Render the ArrowUpRight icon.
 *
 * @return {Element} The ArrowUpRight icon.
 */
const ArrowUpRight = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<GoArrowUpRight />
	</span>
);

/**
 * Default Props.
 */
ArrowUpRight.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
ArrowUpRight.propTypes = {
	className: PropTypes.string,
};

export default ArrowUpRight;
