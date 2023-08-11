import PropTypes from 'prop-types';

/** Templates & Components. */
import HomePageTmpl from '@templates/HomePage';
import LayoutWrapper from '@ui/layouts/LayoutWrapper';

/** Functions. */
import fetchHomePage from '@libs/general/dynamic-page/fetchHomePage';

/**
 * Render the HomePage component.
 *
 * @return {Element} The HomePage component.
 */
const HomePage = ({ page }) => <HomePageTmpl collection={page?.collection} />;

/**
 * Prop Types.
 */
HomePage.propTypes = {
	page: PropTypes.shape({
		collection: PropTypes.shape({}).isRequired,
	}).isRequired,
};

/** Page Layout. */
HomePage.getLayout = (page, data) => <LayoutWrapper data={data}>{page}</LayoutWrapper>;

/**
 * Get page props.
 *
 * @return {object} Page props.
 */
export const getStaticProps = async ({ preview }) => {
	try {
		const data = await fetchHomePage(preview);
		return { props: { data } };
	} catch (error) {
		return { notFound: true };
	}
};

export default HomePage;
