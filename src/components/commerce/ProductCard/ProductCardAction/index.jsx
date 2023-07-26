import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as cart from '@store/slices/cartOps/cartOps.thunks';

/** Components. */
import CartIcon from '@icons/regular/Cart';
import UnorderedListIcon from '@icons/regular/UnorderedList';
import HeartIcon from '@icons/regular/Heart';

/** Styles. */
import styles, { btnStyles } from '@ui/commerce/ProductCard/ProductCardAction/styles.cva';

/**
 * Render the ProductCardAction component.
 *
 * @return {Element} The ProductCardAction component.
 */
const ProductCardAction = ({ productId, open, hasVariants, href, className, ...props }) => {
	const dispatch = useDispatch();

	/** Navigate to product page or add product to cart. */
	const handleAddToCart = () => {
		if (hasVariants && typeof window !== 'undefined') {
			const newWindow = window.open(href, '_blank', 'noopener,noreferrer');
			if (newWindow) newWindow.opener = null;
			return;
		}
		dispatch(cart.addCartItem({ id: productId, quantity: 1 }));
	};

	return (
		<div className={styles({ className, open })} {...props}>
			<button type="button" className={btnStyles()} tabIndex="-1">
				<span className="sr-only">add to wishlist</span>
				<HeartIcon className="!text-base" />
			</button>
			<button type="button" className={btnStyles()} tabIndex="-1" onClick={handleAddToCart}>
				<span className="sr-only">{hasVariants ? 'select variants' : 'add to cart'}</span>
				{hasVariants ? (
					<UnorderedListIcon className="!text-base" />
				) : (
					<CartIcon className="!text-base" />
				)}
			</button>
		</div>
	);
};

/**
 * Default Props.
 */
ProductCardAction.defaultProps = {
	open: false,
	hasVariants: false,
	className: '',
};

/**
 * Prop Types.
 */
ProductCardAction.propTypes = {
	productId: PropTypes.string.isRequired,
	open: PropTypes.bool,
	hasVariants: PropTypes.bool,
	href: PropTypes.string.isRequired,
	className: PropTypes.string,
};

export default ProductCardAction;
