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
	try {
		const staticPaths = await fetchPaths();
		return { paths: staticPaths ?? [], fallback: false };
	} catch (error) {
		return { paths: [], fallback: false };
	}
};

/**
 * Get page props.
 *
 * @return {object} Page props.
 */
export const getStaticProps = async ({ params }) => {
	const slug = params?.slug?.join('/');
	try {
		const data = await fetchPage(false, slug);
		const response = { props: { data } };
		return data ? response : { notFound: true };
	} catch (error) {
		return { notFound: true };
	}
};

export default StaticPage;
