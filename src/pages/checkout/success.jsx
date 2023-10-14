import { HTTP_STATUS } from '@constants';

/** Components. */
import Container from '@ui/general/Container';
import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import CheckoutSuccess from '@ui/commerce/CheckoutSuccess';
import CheckoutFail from '@ui/commerce/CheckoutFail';

/** Hooks. */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Functions. */
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';
import { reset as resetCheckout } from '@store/slices/checkout';
import { selectlastOrderContent } from '@store/slices/lastOrder/lastOrder.selectors';
import * as selectors from '@store/slices/checkout/checkout.selectors';

/**
 * Render the CheckoutSuccessPage component.
 *
 * @return {Element} The CheckoutSuccessPage component.
 */
const CheckoutSuccessPage = () => {
	const dispatch = useDispatch();
	const status = useSelector(selectors.selectStatus);
	const fulfilled = useSelector(selectors.selectFulfilled);
	const lastOrder = useSelector(selectlastOrderContent);

	/** Reset checkout. */
	useEffect(() => {
		if (status === HTTP_STATUS.succeeded && fulfilled) {
			dispatch(resetCheckout());
		}
	}, [dispatch, status, fulfilled]);

	if (!lastOrder) {
		return <CheckoutFail title="Oh no, something went wrong!" description={null} />;
	}

	return (
		<main className="py-10 lg:py-14">
			<Container>
				{lastOrder ? <CheckoutSuccess data={lastOrder} /> : <div>No Order</div>}
			</Container>
		</main>
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
