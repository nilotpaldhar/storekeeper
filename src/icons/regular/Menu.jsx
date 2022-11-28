import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiOutlineMenu } from 'react-icons/ai';

/**
 * Render the Menu icon.
 *
 * @return {Element} The Menu icon.
 */
const Menu = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<AiOutlineMenu />
	</span>
);

/**
 * Default Props.
 */
Menu.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Menu.propTypes = {
	className: PropTypes.string,
};

export default Menu;
