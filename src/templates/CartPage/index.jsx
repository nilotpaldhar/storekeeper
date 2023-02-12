import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Container from '@ui/general/Container';

/** Components. */
const BlockUI = dynamic(() => import('@ui/feedback/BlockUI'));
const CartList = dynamic(() => import('@ui/commerce/CartList'));
const CartSummary = dynamic(() => import('@ui/commerce/CartSummary'));
const LoadingBars = dynamic(() => import('@ui/Loaders/LoadingBars'));

/**
 * Render the CartPageTmpl component.
 *
 * @return {Element} The CartPageTmpl component.
 */
const CartPageTmpl = ({ data, block, loading }) => {
	const subtotalAmt = data?.subtotal?.raw;
	const discountAmt = data?.discount?.amountSaved?.raw;
	const grandTotal = discountAmt ? (subtotalAmt - discountAmt)?.toFixed(2) : subtotalAmt;

	return (
		<main className="py-10 lg:py-14">
			<Container>
				{loading ? (
					<div className="flex justify-center items-center h-[50vh]">
						<LoadingBars />
					</div>
				) : (
					<BlockUI blocking={block} className="block">
						{data?.isEmpty ? (
							<div className="flex flex-col items-center justify-center py-10 space-y-2 text-center lg:space-y-4">
								<h1 className="text-xl font-normal leading-snug lg:text-2xl">
									Your cart is empty!
								</h1>
								<p className="text-sm leading-normal lg:text-base">
									Explore our wide selection and find something you like
								</p>
							</div>
						) : (
							<div className="flex flex-col space-y-10 xl:flex-row xl:space-x-8 xl:space-y-0">
								<section className="flex-1">
									<CartList collection={data?.items} currency={data?.currency} />
								</section>
								<section className="flex-1 xl:max-w-xs">
									<CartSummary
										discount={data?.discount}
										subTotal={data?.subtotal?.formattedWithSymbol}
										grandTotal={`${data?.currency?.symbol}${grandTotal}`}
										discountTotal={data?.discount?.amountSaved?.formattedWithSymbol}
									/>
								</section>
							</div>
						)}
					</BlockUI>
				)}
			</Container>
		</main>
	);
};

/**
 * Default Props.
 */
CartPageTmpl.defaultProps = {
	block: false,
	loading: false,
};

/**
 * Prop Types.
 */
CartPageTmpl.propTypes = {
	data: PropTypes.shape({
		isEmpty: PropTypes.bool,
		discount: PropTypes.shape({
			amountSaved: PropTypes.shape({
				raw: PropTypes.number,
				formattedWithSymbol: PropTypes.string,
			}),
		}),
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
	}).isRequired,
	block: PropTypes.bool,
	loading: PropTypes.bool,
};

export default CartPageTmpl;
