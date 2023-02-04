import PropTypes from 'prop-types';

/** Components. */
import Container from '@ui/general/Container';
import CartList from '@ui/commerce/CartList';

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
			<section className="flex-1 lg:max-w-xs">
				<div className="p-5 border border-neutral-50 h-96">Summary</div>
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
	}).isRequired,
};

export default CartPageTmpl;
