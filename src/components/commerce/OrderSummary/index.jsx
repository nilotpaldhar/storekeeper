import PropTypes from 'prop-types';

/** Components. */
import Summary from '@ui/data-display/Summary';
import OrderSummaryPrice from '@ui/commerce/OrderSummary/OrderSummaryPrice';
import OrderSummaryProducts from '@ui/commerce/OrderSummary/OrderSummaryProducts';

/**
 * Render the OrderSummary component.
 *
 * @return {Element} The OrderSummary component.
 */
const OrderSummary = ({ title, products, subtotal, discount, tax, shipping, total }) => (
	<Summary>
		<Summary.Title>{title}</Summary.Title>
		<OrderSummaryProducts className="mb-8" products={products} />
		<OrderSummaryPrice
			subtotal={subtotal}
			discount={discount}
			tax={tax}
			shipping={shipping}
			total={total}
		/>
	</Summary>
);

/**
 * Default Props.
 */
OrderSummary.defaultProps = {
	title: 'Your Order',
	products: [],
	subtotal: null,
	discount: null,
	tax: null,
	shipping: null,
	total: null,
};

/**
 * Prop Types.
 */
OrderSummary.propTypes = {
	title: PropTypes.node,
	products: PropTypes.arrayOf(PropTypes.shape({})),
	subtotal: PropTypes.string,
	discount: PropTypes.string,
	tax: PropTypes.string,
	shipping: PropTypes.string,
	total: PropTypes.string,
};

export default OrderSummary;
