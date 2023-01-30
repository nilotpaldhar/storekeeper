import PropTypes from 'prop-types';

/** Template & Components. */
import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import ProductPageTmpl from '@templates/ProductPage';

/** Functions. */
import fetchProductPage from '@libs/commerce/product/fetchPage';
import fetchProductPaths from '@libs/commerce/product/fetchPaths';

/**
 * Render the ProductPage component.
 *
 * @return {Element} The ProductPage component.
 */
const ProductPage = ({ page }) => <ProductPageTmpl data={page} />;

/**
 * Prop Types.
 */
ProductPage.propTypes = {
	page: PropTypes.shape({}).isRequired,
};

/** Page Layout. */
ProductPage.getLayout = (page, data) => <LayoutWrapper data={data}>{page}</LayoutWrapper>;

/**
 * Get page paths.
 *
 * @return {object} Page props.
 */
export const getStaticPaths = async () => {
	const fallback = 'blocking';

	try {
		const productPaths = await fetchProductPaths();
		return { paths: productPaths || [], fallback };
	} catch (error) {
		return { paths: [], fallback };
	}
};

/**
 * Get page props.
 *
 * @return {object} Page props.
 */
export const getStaticProps = async ({ preview, params }) => {
	const permalink = params?.permalink;
	const revalidate = 10;

	try {
		const data = await fetchProductPage(preview, permalink);
		const response = { props: { data }, revalidate };
		return data ? response : { notFound: true, revalidate };
	} catch (error) {
		return { notFound: true, revalidate };
	}
};

export default ProductPage;
