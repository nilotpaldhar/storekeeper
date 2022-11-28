import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiOutlineInfo } from 'react-icons/ai';

/**
 * Render the User icon.
 *
 * @return {Element} The User icon.
 */
const User = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<AiOutlineInfo />
	</span>
);

/**
 * Default Props.
 */
User.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
User.propTypes = {
	className: PropTypes.string,
};

export default User;
