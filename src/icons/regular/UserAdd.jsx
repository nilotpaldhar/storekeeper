import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiOutlineUserAdd } from 'react-icons/ai';

/**
 * Render the UserAdd icon.
 *
 * @return {Element} The UserAdd icon.
 */
const UserAdd = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<AiOutlineUserAdd />
	</span>
);

/**
 * Default Props.
 */
UserAdd.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
UserAdd.propTypes = {
	className: PropTypes.string,
};

export default UserAdd;
