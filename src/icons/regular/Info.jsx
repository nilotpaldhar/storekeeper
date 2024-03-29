import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineInfo } from 'react-icons/ai';

/**
 * Render the User icon.
 *
 * @return {Element} The User icon.
 */
const User = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
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
