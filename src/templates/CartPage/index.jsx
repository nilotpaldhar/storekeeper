import PropTypes from 'prop-types';

/** Components. */
import Container from '@ui/general/Container';
import CartList from '@ui/commerce/CartList';
import CartSummary from '@ui/commerce/CartSummary';

/**
 * Render the CartPageTmpl component.
 *
 * @return {Element} The CartPageTmpl component.
 */
const CartPageTmpl = ({ data }) => (
	<main className="py-10 lg:py-14">
		<Container className="flex flex-col space-y-10 xl:flex-row xl:space-x-8 xl:space-y-0">
			<section className="flex-1">
				<CartList empty={data?.isEmpty} collection={data?.items} currency={data?.currency} />
			</section>
			<section className="flex-1 xl:max-w-xs">
				<CartSummary subTotal={data?.subtotal?.formattedWithSymbol} coupons={data?.discounts} />
			</section>
		</Container>
	</main>
);

/**
 * Prop Types.
 */
CartPageTmpl.propTypes = {
	data: PropTypes.shape({
		isEmpty: PropTypes.bool,
		currency: PropTypes.shape({
			code: PropTypes.string,
			symbol: PropTypes.string,
		}),
		items: PropTypes.arrayOf(PropTypes.shape({})),
		subtotal: PropTypes.shape({
			raw: PropTypes.number,
			formatted: PropTypes.string,
			formattedWithCode: PropTypes.string,
			formattedWithSymbol: PropTypes.string,
		}),
		discounts: PropTypes.arrayOf(PropTypes.shape({})),
	}).isRequired,
};

export default CartPageTmpl;
