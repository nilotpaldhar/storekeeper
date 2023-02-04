import { useEffect, useState } from 'react';

/** Components & Templates. */
import CartPageTmpl from '@templates/CartPage';
import LayoutWrapper from '@ui/layouts/LayoutWrapper';

/** Functions. */
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';
import axios from 'axios';
/**
 * Render the CartPage component.
 *
 * @return {Element} The CartPage component.
 */
const CartPage = () => {
	const [cart, setCart] = useState({});

	useEffect(() => {
		(async () => {
			const cartRes = await axios.get('/api/commerce/cart');
			setCart(cartRes?.data?.data);
		})();
	}, []);

	return <CartPageTmpl data={cart} />;
};

/**
 * Prop Types.
 */
CartPage.propTypes = {};

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
