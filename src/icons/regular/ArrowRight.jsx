import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineArrowRight } from 'react-icons/ai';

/**
 * Render the ArrowRight icon.
 *
 * @return {Element} The ArrowRight icon.
 */
const ArrowRight = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineArrowRight />
	</span>
);

/**
 * Default Props.
 */
ArrowRight.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
ArrowRight.propTypes = {
	className: PropTypes.string,
};

export default ArrowRight;
