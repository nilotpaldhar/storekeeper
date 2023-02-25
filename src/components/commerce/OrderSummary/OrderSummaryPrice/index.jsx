import PropTypes from 'prop-types';
import Summary from '@ui/data-display/Summary';
import DashIcon from '@icons/regular/Dash';
import PlusIcon from '@icons/regular/Plus';
import MinusIcon from '@icons/regular/Minus';

/**
 * Render the OrderSummaryPrice component.
 *
 * @return {Element} The OrderSummaryPrice component.
 */
const OrderSummaryPrice = ({ title, subtotal, discount, tax, shipping, total, ...props }) => (
	<section {...props}>
		<Summary.SubTitle>{title}</Summary.SubTitle>
		<Summary.List>
			<Summary.ListItem className="flex items-center justify-between">
				<span>Sub-total</span>
				{subtotal ? <span>{subtotal}</span> : <DashIcon />}
			</Summary.ListItem>
			<Summary.ListItem className="flex items-center justify-between">
				<span>Discount</span>
				{discount ? (
					<span className="flex items-center space-x-1">
						<span className="flex items-center text-xs">
							&#40;
							<MinusIcon className="!text-xs" />
							&#41;
						</span>
						<span>{discount}</span>
					</span>
				) : (
					<DashIcon />
				)}
			</Summary.ListItem>
			<Summary.ListItem className="flex items-center justify-between">
				<span>Total Tax</span>
				{tax ? (
					<span className="flex items-center space-x-1">
						<span className="flex items-center text-xs">
							&#40;
							<PlusIcon className="!text-xs" />
							&#41;
						</span>
						<span>{tax}</span>
					</span>
				) : (
					<DashIcon />
				)}
			</Summary.ListItem>
			<Summary.ListItem className="flex items-center justify-between">
				<span>Delivery Charge</span>
				{shipping ? (
					<span className="flex items-center space-x-1">
						<span className="flex items-center text-xs">
							&#40;
							<PlusIcon className="!text-xs" />
							&#41;
						</span>
						<span>{shipping}</span>
					</span>
				) : (
					<DashIcon />
				)}
			</Summary.ListItem>
		</Summary.List>
		<Summary.Divider className="my-6" />
		<Summary.SubTitle className="flex items-center justify-between !mb-0">
			<span>Total Amount</span>
			{total ? <span>{total}</span> : <DashIcon />}
		</Summary.SubTitle>
	</section>
);

/**
 * Default Props.
 */
OrderSummaryPrice.defaultProps = {
	title: 'Price Details',
	subtotal: null,
	discount: null,
	tax: null,
	shipping: null,
	total: null,
};

/**
 * Prop Types.
 */
OrderSummaryPrice.propTypes = {
	title: PropTypes.node,
	subtotal: PropTypes.string,
	discount: PropTypes.string,
	tax: PropTypes.string,
	shipping: PropTypes.string,
	total: PropTypes.string,
};

export default OrderSummaryPrice;
