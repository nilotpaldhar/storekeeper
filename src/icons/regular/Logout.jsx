import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiOutlineLogout } from 'react-icons/ai';

/**
 * Render the Logout icon.
 *
 * @return {Element} The Logout icon.
 */
const Logout = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<AiOutlineLogout />
	</span>
);

/**
 * Default Props.
 */
Logout.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Logout.propTypes = {
	className: PropTypes.string,
};

export default Logout;
