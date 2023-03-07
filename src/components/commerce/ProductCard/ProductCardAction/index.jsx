import PropTypes from 'prop-types';
import CartIcon from '@icons/regular/Cart';
import HeartIcon from '@icons/regular/Heart';
import styles, { btnStyles } from '@ui/commerce/ProductCard/ProductCardAction/styles.cva';

/**
 * Render the ProductCardAction component.
 *
 * @return {Element} The ProductCardAction component.
 */
const ProductCardAction = ({ open, className, ...props }) => (
	<div className={styles({ className, open })} {...props}>
		<button type="button" className={btnStyles()} tabIndex="-1">
			<span className="sr-only">add to wishlist</span>
			<HeartIcon className="!text-base" />
		</button>
		<button type="button" className={btnStyles()} tabIndex="-1">
			<span className="sr-only">add to cart</span>
			<CartIcon className="!text-base" />
		</button>
	</div>
);

/**
 * Default Props.
 */
ProductCardAction.defaultProps = {
	open: false,
	className: '',
};

/**
 * Prop Types.
 */
ProductCardAction.propTypes = {
	open: PropTypes.bool,
	className: PropTypes.string,
};

export default ProductCardAction;
