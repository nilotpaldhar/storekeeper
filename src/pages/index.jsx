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
const HomePage = ({ page }) => (
	<HomePageTmpl
		banners={page?.banners}
		categories={page?.categories}
		offers={page?.offers}
		specialOffer={page?.specialOffer}
		collection={page?.collection}
	/>
);

/**
 * Prop Types.
 */
HomePage.propTypes = {
	page: PropTypes.shape({
		banners: PropTypes.shape({}).isRequired,
		categories: PropTypes.shape({}).isRequired,
		offers: PropTypes.shape({}).isRequired,
		specialOffer: PropTypes.shape({}).isRequired,
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
	const revalidate = 10;

	try {
		const data = await fetchHomePage(preview);
		const response = { props: { data }, revalidate };
		return data ? response : { notFound: true, revalidate };
	} catch (error) {
		return { notFound: true, revalidate };
	}
};

export default HomePage;
