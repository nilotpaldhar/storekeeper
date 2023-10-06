import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { resetCheckout } from '@store/slices/checkout';

/** Hooks. */
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import useToggle from '@hooks/useToggle';

/** Components. */
import Empty from '@ui/feedback/Empty';
import Container from '@ui/general/Container';
import RegularButton from '@ui/buttons/RegularButton';
import ArrowLeftIcon from '@icons/regular/ArrowLeft';
import emptyCartImg from '@public/empty-cart.svg';

const BlockUI = dynamic(() => import('@ui/feedback/BlockUI'));
const LoadingUI = dynamic(() => import('@ui/feedback/LoadingUI'));
const CartSummary = dynamic(() => import('@ui/commerce/CartSummary'));
const CartList = dynamic(() => import('@ui/commerce/CartList'), {
	loading: () => <LoadingUI loading />,
});

/**
 * Render the CartPageTmpl component.
 *
 * @return {Element} The CartPageTmpl component.
 */
const CartPageTmpl = ({ data, block, loading }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [checkoutProgress, toggleCheckoutProgress] = useToggle(false);

	const subtotalAmt = data?.subtotal?.raw;
	const discountAmt = data?.discount?.amountSaved?.raw;
	const grandTotal = discountAmt ? (subtotalAmt - discountAmt)?.toFixed(2) : subtotalAmt;
	const cartTitle = `Cart Summary (${data?.totalItems} ${data?.totalItems > 1 ? 'items' : 'item'})`;

	/** Create checkout token. */
	const handleCheckout = async () => {
		const cartId = data?.id;
		const url = '/api/commerce/checkout/token/generate';

		if (!cartId) return;

		toggleCheckoutProgress(true);
		dispatch(resetCheckout());

		try {
			const res = await axios.post(url, { cartId });
			const token = res?.data?.token;
			if (token) router.push(`/checkout?token=${token}`);
		} catch (error) {
			toggleCheckoutProgress(false);
		}
	};

	return (
		<main className={`py-10 lg:py-14 ${!data?.isEmpty ? 'min-h-screen' : ''}`}>
			<Container>
				<LoadingUI loading={loading}>
					<BlockUI blocking={block || checkoutProgress}>
						{data?.isEmpty ? (
							<Empty
								className="py-24"
								imgSrc={emptyCartImg}
								title="Your cart is empty!"
								description={
									<>
										<span className="block">
											Once you add something to your cart, it will appear here.
										</span>
										<span className="block">Ready to get started?</span>
									</>
								}
							>
								<RegularButton as="anchor" href="/" className="px-8" startIcon={ArrowLeftIcon}>
									Continue Shopping
								</RegularButton>
							</Empty>
						) : (
							<div className="grid grid-cols-12 gap-6">
								<section className="col-span-12 md:col-span-8 lg:col-span-8">
									<CartList collection={data?.items} currency={data?.currency} />
								</section>
								<section className="col-span-12 md:col-span-4 lg:col-span-4">
									<div className="md:sticky top-6">
										<CartSummary
											title={cartTitle}
											discount={data?.discount}
											subTotal={data?.subtotal?.formattedWithSymbol}
											grandTotal={`${data?.currency?.symbol}${grandTotal}`}
											discountTotal={data?.discount?.amountSaved?.formattedWithSymbol}
											onCheckout={handleCheckout}
										/>
									</div>
								</section>
							</div>
						)}
					</BlockUI>
				</LoadingUI>
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
		id: PropTypes.string,
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
		totalItems: PropTypes.number,
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
