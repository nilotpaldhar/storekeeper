import PropTypes from 'prop-types';
import { HTTP_STATUS } from '@constants';

/** Components & Templates. */
import CheckoutFail from '@ui/commerce/CheckoutFail';
import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import CheckoutPageTmpl from '@templates/CheckoutPage';

/** Hooks. */
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Functions. */
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';
import { initCheckout } from '@store/slices/checkout/checkout.thunks';
import * as selectors from '@store/slices/checkout/checkout.selectors';

/**
 * Render the CheckoutPage component.
 *
 * @return {Element} The CheckoutPage component.
 */
const CheckoutPage = ({ query }) => {
	const router = useRouter();
	const dispatch = useDispatch();

	const token = query?.token;
	const status = useSelector(selectors.selectStatus);
	const contents = useSelector(selectors.selectContents);
	const fulfilled = useSelector(selectors.selectFulfilled);
	const error = useSelector(selectors.selectError);

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

	/** Empty token */
	if (!token) {
		return <CheckoutFail title="There is no token present!" description={null} />;
	}

	/** Checkout failed */
	if (status === HTTP_STATUS.failed) {
		return <CheckoutFail title={error} description={null} defaultError={!error} />;
	}

	return (
		<div className="min-h-[80vh]">
			<CheckoutPageTmpl
				data={contents ?? {}}
				loading={status === HTTP_STATUS.pending || status === HTTP_STATUS.idle || fulfilled}
			/>
		</div>
	);
};

/**
 * Prop Types.
 */
CheckoutPage.propTypes = {
	query: PropTypes.shape({
		token: PropTypes.string,
	}).isRequired,
};

/** Page Layout. */
CheckoutPage.getLayout = (page, data) => <LayoutWrapper data={data}>{page}</LayoutWrapper>;

/**
 * Get page props.
 *
 * @return {object} Page props.
 */
export const getServerSideProps = async ({ preview, query }) => {
	const page = {
		seo: {
			metaTitle: 'Checkout',
			shareTitle: 'Checkout',
		},
	};

	try {
		const { siteConfig } = await fetchSiteConfig(preview);
		return { props: { data: { siteConfig, page, query } } };
	} catch (error) {
		return { notFound: true };
	}
};

export default CheckoutPage;
