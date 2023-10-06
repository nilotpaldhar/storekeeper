import PropTypes from 'prop-types';

/** Components & Icons. */
import Box from '@ui/data-display/Box';
import PriceRecap from '@ui/commerce/PriceRecap';
import RegularButton from '@ui/buttons/RegularButton';
import CartSummaryDiscount from '@ui/commerce/CartSummary/CartSummaryDiscount';
import ArrowRightIcon from '@icons/regular/ArrowRight';

/**
 * Render the CartSummary component.
 *
 * @return {Element} The CartSummary component.
 */
const CartSummary = ({
	title,
	btnText,
	subTotal,
	grandTotal,
	discount,
	discountTotal,
	onCheckout,
	...props
}) => (
	<Box {...props}>
		<Box.Title className="!px-3 lg:!px-5">{title}</Box.Title>
		<Box.Block className="px-3 lg:px-5">
			<CartSummaryDiscount data={discount} />
		</Box.Block>
		<Box.Divider />
		<PriceRecap subTotal={subTotal} grandTotal={grandTotal} discount={discountTotal} />
		<Box.Divider />
		<Box.Block className="px-3 lg:px-5">
			<RegularButton fullWidth endIcon={ArrowRightIcon} onClick={onCheckout}>
				{btnText}
			</RegularButton>
		</Box.Block>
	</Box>
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
	onCheckout: () => {},
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
	onCheckout: PropTypes.func,
};

export default CartSummary;
