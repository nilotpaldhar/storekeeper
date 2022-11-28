import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiOutlineShoppingCart } from 'react-icons/ai';

/**
 * Render the Cart icon.
 *
 * @return {Element} The Cart icon.
 */
const Cart = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<AiOutlineShoppingCart />
	</span>
);

/**
 * Default Props.
 */
Cart.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Cart.propTypes = {
	className: PropTypes.string,
};

export default Cart;
