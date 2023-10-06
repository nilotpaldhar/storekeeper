import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

/** Components. */
import Container from '@ui/general/Container';

const LoadingUI = dynamic(() => import('@ui/feedback/LoadingUI'));
const OrderRecap = dynamic(() => import('@ui/commerce/OrderRecap'));
const CheckoutSteps = dynamic(() => import('@ui/commerce/CheckoutSteps'), {
	loading: () => <LoadingUI loading />,
});

/**
 * Render the CheckoutPageTmpl component.
 *
 * @return {Element} The CheckoutPageTmpl component.
 */
const CheckoutPageTmpl = ({ data, loading }) => (
	<main className="py-10 lg:py-14 min-h-screen">
		<Container>
			<LoadingUI loading={loading}>
				<div className="flex flex-col space-y-10 xl:flex-row xl:space-x-8 xl:space-y-0">
					<section className="flex-1">
						<CheckoutSteps tokenId={data?.id} />
					</section>
					<section className="flex-1 xl:max-w-sm">
						<div className="md:sticky top-6">
							<OrderRecap
								products={data?.items}
								subTotal={data?.subtotal?.formattedWithSymbol}
								tax={data?.tax?.amount?.formattedWithSymbol}
								discount={data?.discount?.amountSaved?.formattedWithSymbol}
								shipping={data?.shipping?.price?.formattedWithSymbol}
								grandTotal={data?.totalDue?.formattedWithSymbol}
							/>
						</div>
					</section>
				</div>
			</LoadingUI>
		</Container>
	</main>
);

/**
 * Default Props.
 */
CheckoutPageTmpl.defaultProps = {
	loading: false,
};

/**
 * Prop Types.
 */
CheckoutPageTmpl.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.string,
		items: PropTypes.arrayOf(PropTypes.shape({})),
		subtotal: PropTypes.shape({
			formattedWithSymbol: PropTypes.string,
		}),
		tax: PropTypes.shape({
			amount: PropTypes.shape({
				raw: PropTypes.number,
				formattedWithSymbol: PropTypes.string,
			}),
		}),
		totalDue: PropTypes.shape({
			formattedWithSymbol: PropTypes.string,
		}),
		shipping: PropTypes.shape({
			price: PropTypes.shape({
				formattedWithSymbol: PropTypes.string,
			}),
		}),
		discount: PropTypes.shape({
			amountSaved: PropTypes.shape({
				formattedWithSymbol: PropTypes.string,
			}),
		}),
	}).isRequired,
	loading: PropTypes.bool,
};

export default CheckoutPageTmpl;
