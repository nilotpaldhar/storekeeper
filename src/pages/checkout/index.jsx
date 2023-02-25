import { HTTP_STATUS } from '@constants';

/** Components & Templates. */
import Alert from '@ui/feedback/Alert';
import Anchor from '@ui/general/Anchor';
import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import CheckoutPageTmpl from '@templates/CheckoutPage';

/** Hooks. */
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Functions. */
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';
import { initCheckout } from '@store/slices/checkout/checkout.thunks';
import {
	selectCheckoutStatus,
	selectCheckoutContents,
	selectCheckoutFulfilled,
} from '@store/slices/checkout/checkout.selectors';

/**
 * Render the CheckoutPage component.
 *
 * @return {Element} The CheckoutPage component.
 */
const CheckoutPage = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const token = router?.query?.token;
	const status = useSelector(selectCheckoutStatus);
	const contents = useSelector(selectCheckoutContents);
	const fulfilled = useSelector(selectCheckoutFulfilled);

	/** Initiate checkout process. */
	useEffect(() => {
		if (token && status === HTTP_STATUS.idle) {
			dispatch(initCheckout(token));
		}
	}, [dispatch, token, status]);

	/** Redirect when checkout process fulfilled. */
	useEffect(() => {
		if (status === HTTP_STATUS.succeeded && fulfilled) {
			router.push('/checkout/success');
		}
	}, [router, status, fulfilled]);

	return (
		<div className="min-h-[50vh]">
			{status === HTTP_STATUS.failed ? (
				<Alert type="error" align="center" className="!py-3">
					<div className="flex items-center space-x-2">
						<p>Checkout error! Sorry something went wrong.</p>
						<Anchor
							href="/cart"
							className="font-semibold text-current underline hover:text-current"
						>
							Try Again
						</Anchor>
					</div>
				</Alert>
			) : (
				<CheckoutPageTmpl
					data={contents ?? {}}
					loading={status === HTTP_STATUS.pending || status === HTTP_STATUS.idle || fulfilled}
				/>
			)}
		</div>
	);
};

/** Page Layout. */
CheckoutPage.getLayout = (page, data) => <LayoutWrapper data={data}>{page}</LayoutWrapper>;

/**
 * Get page props.
 *
 * @return {object} Page props.
 */
export const getStaticProps = async ({ preview }) => {
	const page = {
		seo: {
			metaTitle: 'Checkout',
			shareTitle: 'Checkout',
		},
	};

	try {
		const { siteConfig } = await fetchSiteConfig(preview);
		return { props: { data: { siteConfig, page } } };
	} catch (error) {
		return { notFound: true };
	}
};

export default CheckoutPage;
