import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiOutlineArrowDown } from 'react-icons/ai';

/**
 * Render the ArrowDown icon.
 *
 * @return {Element} The ArrowDown icon.
 */
const ArrowDown = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<AiOutlineArrowDown />
	</span>
);

/**
 * Default Props.
 */
ArrowDown.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
ArrowDown.propTypes = {
	className: PropTypes.string,
};

export default ArrowDown;
