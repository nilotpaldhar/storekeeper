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
const CartSummary = ({ title, btnText, subTotal, coupons }) => (
	<Summary>
		<Summary.Title>{title}</Summary.Title>
		<CartSummaryDiscount className="mb-8" coupons={coupons} />
		<CartSummaryTotal
			className="mb-6"
			subTotal={subTotal}
			grandTotal={subTotal}
			couponDiscount={null}
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
	coupons: [],
};

/**
 * Prop Types.
 */
CartSummary.propTypes = {
	title: PropTypes.node,
	btnText: PropTypes.node,
	subTotal: PropTypes.string,
	coupons: PropTypes.arrayOf(PropTypes.shape({})),
};

export default CartSummary;
