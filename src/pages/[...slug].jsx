import PropTypes from 'prop-types';

/** Components. */
import LayoutWrapper from '@ui/layouts/LayoutWrapper';

/** Templates. */
import StaticPageTmpl from '@templates/StaticPage';

/** Functions. */
import fetchPage from '@libs/general/static-page/fetchPage';
import fetchPaths from '@libs/general/static-page/fetchPaths';

/**
 * Render the StaticPage component.
 *
 * @return {Element} The StaticPage component.
 */
const StaticPage = ({ page }) => <StaticPageTmpl data={page} />;

/**
 * Prop Types.
 */
StaticPage.propTypes = {
	page: PropTypes.shape({}).isRequired,
};

/**
 * Page Layout.
 * */
StaticPage.getLayout = (page, data) => <LayoutWrapper data={data}>{page}</LayoutWrapper>;

/**
 * Get page paths.
 *
 * @return {object} Page props.
 */
export const getStaticPaths = async () => {
	const fallback = 'blocking';

	try {
		const staticPaths = await fetchPaths();
		return { paths: staticPaths ?? [], fallback };
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
	const slug = params?.slug?.join('/');
	const revalidate = 60;

	try {
		const data = await fetchPage(preview, slug);
		const response = { props: { data }, revalidate };
		return data ? response : { notFound: true, revalidate };
	} catch (error) {
		return { notFound: true, revalidate };
	}
};

export default StaticPage;
