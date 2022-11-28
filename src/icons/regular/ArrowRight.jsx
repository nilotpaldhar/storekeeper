import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiOutlineArrowRight } from 'react-icons/ai';

/**
 * Render the ArrowRight icon.
 *
 * @return {Element} The ArrowRight icon.
 */
const ArrowRight = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
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
