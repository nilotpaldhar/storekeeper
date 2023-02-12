import PropTypes from 'prop-types';
import Summary from '@ui/data-display/Summary';
import DashIcon from '@icons/regular/Dash';

/**
 * Render the CartSummaryTotal component.
 *
 * @return {Element} The CartSummaryTotal component.
 */
const CartSummaryTotal = ({ title, subTotal, grandTotal, discountTotal, ...props }) => (
	<section {...props}>
		<Summary.SubTitle>{title}</Summary.SubTitle>
		<Summary.List>
			<Summary.ListItem className="flex items-center justify-between">
				<span>Sub-total</span>
				{subTotal ? <span>{subTotal}</span> : <DashIcon />}
			</Summary.ListItem>
			<Summary.ListItem className="flex items-center justify-between">
				<span>Discount</span>
				{discountTotal ? <span>{discountTotal}</span> : <DashIcon />}
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
	grandTotal: null,
	discountTotal: null,
};

/**
 * Prop Types.
 */
CartSummaryTotal.propTypes = {
	title: PropTypes.node,
	subTotal: PropTypes.string,
	grandTotal: PropTypes.string,
	discountTotal: PropTypes.string,
};

export default CartSummaryTotal;
