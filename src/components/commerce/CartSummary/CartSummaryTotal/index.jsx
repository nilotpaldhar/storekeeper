import PropTypes from 'prop-types';
import Summary from '@ui/data-display/Summary';
import DashIcon from '@icons/regular/Dash';

/**
 * Render the CartSummaryTotal component.
 *
 * @return {Element} The CartSummaryTotal component.
 */
const CartSummaryTotal = ({ title, subTotal, couponDiscount, grandTotal, ...props }) => (
	<section {...props}>
		<Summary.SubTitle>{title}</Summary.SubTitle>
		<Summary.List>
			<Summary.ListItem className="flex items-center justify-between">
				<span>Sub-total</span>
				{subTotal ? <span>{subTotal}</span> : <DashIcon />}
			</Summary.ListItem>
			<Summary.ListItem className="flex items-center justify-between">
				<span>Coupon Discount</span>
				{couponDiscount ? <span>{couponDiscount}</span> : <DashIcon />}
			</Summary.ListItem>
		</Summary.List>
		<Summary.Divider className="my-6" />
		<Summary.SubTitle className="flex items-center justify-between !mb-0">
			<span>Total Amount</span>
			{grandTotal ? <span>{grandTotal}</span> : <DashIcon />}
		</Summary.SubTitle>
	</section>
);

/**
 * Default Props.
 */
CartSummaryTotal.defaultProps = {
	title: 'Totals',
	subTotal: null,
	couponDiscount: null,
	grandTotal: null,
};

/**
 * Prop Types.
 */
CartSummaryTotal.propTypes = {
	title: PropTypes.node,
	subTotal: PropTypes.string,
	couponDiscount: PropTypes.string,
	grandTotal: PropTypes.string,
};

export default CartSummaryTotal;
