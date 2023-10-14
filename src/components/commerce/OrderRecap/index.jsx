import PropTypes from 'prop-types';

/** Components & Icons. */
import Box from '@ui/data-display/Box';
import PriceRecap from '@ui/commerce/PriceRecap';
import ProductRecap from '@ui/commerce/ProductRecap';
import ScrollArea from '@ui/general/ScrollArea';

/**
 * Render the OrderRecap component.
 *
 * @return {Element} The OrderRecap component.
 */
const OrderRecap = ({
	title,
	products,
	subTotal,
	grandTotal,
	discount,
	tax,
	shipping,
	...props
}) => (
	<Box {...props}>
		<Box.Title className="!px-3 lg:!px-5" as="h2">
			{title}
		</Box.Title>
		<ScrollArea height={products?.length > 3 ? 300 : null}>
			<div>
				<Box.Block className="px-3 lg:px-5">
					<ProductRecap products={products} />
				</Box.Block>
			</div>
		</ScrollArea>

		<Box.Divider />
		<PriceRecap
			tax={tax}
			subTotal={subTotal}
			discount={discount}
			shipping={shipping}
			grandTotal={grandTotal}
		/>
	</Box>
);

/**
 * Default Props.
 */
OrderRecap.defaultProps = {
	title: 'Order Summary',
	products: [],
	subTotal: '',
	grandTotal: '',
	discount: '',
	tax: '',
	shipping: '',
};

/**
 * Prop Types.
 */
OrderRecap.propTypes = {
	title: PropTypes.node,
	products: PropTypes.arrayOf(PropTypes.shape({})),
	subTotal: PropTypes.string,
	grandTotal: PropTypes.string,
	discount: PropTypes.string,
	tax: PropTypes.string,
	shipping: PropTypes.string,
};

export default OrderRecap;
