import { HTTP_STATUS } from '@constants';

/** Components & Templates. */
import Container from '@ui/general/Container';
import LayoutWrapper from '@ui/layouts/LayoutWrapper';

/** Hooks. */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Functions. */
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';
import { resetCheckout } from '@store/slices/checkout';
import {
	selectCheckoutStatus,
	selectCheckoutFulfilled,
} from '@store/slices/checkout/checkout.selectors';

/**
 * Render the CheckoutSuccessPage component.
 *
 * @return {Element} The CheckoutSuccessPage component.
 */
const CheckoutSuccessPage = () => {
	const dispatch = useDispatch();
	const status = useSelector(selectCheckoutStatus);
	const fulfilled = useSelector(selectCheckoutFulfilled);

	/** Reset checkout. */
	useEffect(() => {
		if (status === HTTP_STATUS.succeeded && fulfilled) {
			dispatch(resetCheckout());
		}
	}, [dispatch, status, fulfilled]);

	return (
		<Container className="py-10">
			<h1 className="text-4xl font-bold text-center">Checkout Success</h1>
		</Container>
	);
};

/** Page Layout. */
CheckoutSuccessPage.getLayout = (page, data) => <LayoutWrapper data={data}>{page}</LayoutWrapper>;

/**
 * Get page props.
 *
 * @return {object} Page props.
 */
export const getStaticProps = async ({ preview }) => {
	const page = {
		seo: {
			metaTitle: 'Checkout Success',
			shareTitle: 'Checkout Success',
		},
	};

	try {
		const { siteConfig } = await fetchSiteConfig(preview);
		return { props: { data: { siteConfig, page } } };
	} catch (error) {
		return { notFound: true };
	}
};

export default CheckoutSuccessPage;
