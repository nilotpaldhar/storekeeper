import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiOutlineRight } from 'react-icons/ai';

/**
 * Render the ChevronRight icon.
 *
 * @return {Element} The ChevronRight icon.
 */
const ChevronRight = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<AiOutlineRight />
	</span>
);

/**
 * Default Props.
 */
ChevronRight.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
ChevronRight.propTypes = {
	className: PropTypes.string,
};

export default ChevronRight;
