import PropTypes from 'prop-types';

/** Components. */
import Summary from '@ui/data-display/Summary';
import RegularButton from '@ui/buttons/RegularButton';
import CartSummaryTotal from '@ui/commerce/CartSummary/CartSummaryTotal';
import CartSummaryDiscount from '@ui/commerce/CartSummary/CartSummaryDiscount';

/** Icons. */
import ArrowRightIcon from '@icons/regular/ArrowRight';

/**
 * Render the CartSummary component.
 *
 * @return {Element} The CartSummary component.
 */
const CartSummary = ({ title, btnText, subTotal, grandTotal, discount, discountTotal }) => (
	<Summary>
		<Summary.Title>{title}</Summary.Title>
		<CartSummaryDiscount className="mb-8" data={discount} />
		<CartSummaryTotal
			className="mb-6"
			subTotal={subTotal}
			grandTotal={grandTotal}
			discountTotal={discountTotal}
		/>
		<RegularButton fullWidth endIcon={ArrowRightIcon}>
			{btnText}
		</RegularButton>
	</Summary>
);

/**
 * Default Props.
 */
CartSummary.defaultProps = {
	title: 'Cart Summary',
	btnText: 'Proceed To Checkout',
	subTotal: null,
	grandTotal: null,
	discount: null,
	discountTotal: null,
};

/**
 * Prop Types.
 */
CartSummary.propTypes = {
	title: PropTypes.node,
	btnText: PropTypes.node,
	subTotal: PropTypes.string,
	grandTotal: PropTypes.string,
	discount: PropTypes.shape({}),
	discountTotal: PropTypes.string,
};

export default CartSummary;
