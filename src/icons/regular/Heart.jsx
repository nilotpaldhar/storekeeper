import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiOutlineHeart } from 'react-icons/ai';

/**
 * Render the Heart icon.
 *
 * @return {Element} The Heart icon.
 */
const Heart = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<AiOutlineHeart />
	</span>
);

/**
 * Default Props.
 */
Heart.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Heart.propTypes = {
	className: PropTypes.string,
};

export default Heart;
