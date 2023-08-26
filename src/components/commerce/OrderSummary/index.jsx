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
const OrderSummary = ({
	title,
	displayTitle,
	products,
	subtotal,
	discount,
	tax,
	shipping,
	total,
	contentPrefix,
	contentSuffix,
}) => (
	<Summary>
		{displayTitle && <Summary.Title>{title}</Summary.Title>}
		{contentPrefix && <div>{contentPrefix}</div>}
		<OrderSummaryProducts className="mb-8" products={products} />
		<OrderSummaryPrice
			subtotal={subtotal}
			discount={discount}
			tax={tax}
			shipping={shipping}
			total={total}
		/>
		{contentSuffix && <div>{contentSuffix}</div>}
	</Summary>
);

/**
 * Default Props.
 */
OrderSummary.defaultProps = {
	title: 'Your Order',
	displayTitle: true,
	products: [],
	subtotal: null,
	discount: null,
	tax: null,
	shipping: null,
	total: null,
	contentPrefix: '',
	contentSuffix: '',
};

/**
 * Prop Types.
 */
OrderSummary.propTypes = {
	title: PropTypes.node,
	displayTitle: PropTypes.bool,
	products: PropTypes.arrayOf(PropTypes.shape({})),
	subtotal: PropTypes.string,
	discount: PropTypes.string,
	tax: PropTypes.string,
	shipping: PropTypes.string,
	total: PropTypes.string,
	contentPrefix: PropTypes.node,
	contentSuffix: PropTypes.node,
};

export default OrderSummary;
