import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HTTP_STATUS } from '@constants';
import { resetCartOps } from '@store/slices/cartOps';
import { selectCartOpsStatus } from '@store/slices/cartOps/cartOps.selectors';
import { selectCartStatus, selectCartContents } from '@store/slices/cart/cart.selectors';

/** Components & Templates. */
import CartPageTmpl from '@templates/CartPage';
import LayoutWrapper from '@ui/layouts/LayoutWrapper';

/** Functions. */
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';

/**
 * Render the CartPage component.
 *
 * @return {Element} The CartPage component.
 */
const CartPage = () => {
	const dispatch = useDispatch();

	const cartStatus = useSelector(selectCartStatus);
	const contents = useSelector(selectCartContents);
	const cartOpsStatus = useSelector(selectCartOpsStatus);

	useEffect(() => {
		dispatch(resetCartOps());
	}, [dispatch]);

	return (
		<div className="min-h-screen">
			{cartStatus === HTTP_STATUS.idle || cartStatus === HTTP_STATUS.failed ? null : (
				<CartPageTmpl
					data={contents ?? {}}
					loading={cartStatus === HTTP_STATUS.pending}
					block={cartOpsStatus === HTTP_STATUS.pending}
				/>
			)}
		</div>
	);
};

/** Page Layout. */
CartPage.getLayout = (page, data) => <LayoutWrapper data={data}>{page}</LayoutWrapper>;

/**
 * Get page props.
 *
 * @return {object} Page props.
 */
export const getStaticProps = async ({ preview }) => {
	const page = {
		seo: {
			metaTitle: 'Shopping Cart',
			shareTitle: 'Shopping Cart',
		},
	};

	try {
		const { siteConfig } = await fetchSiteConfig(preview);
		return { props: { data: { siteConfig, page } } };
	} catch (error) {
		return { notFound: true };
	}
};

export default CartPage;
