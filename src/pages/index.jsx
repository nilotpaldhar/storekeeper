import PropTypes from 'prop-types';

/** Components. */
import Container from '@ui/general/Container';
import LayoutWrapper from '@ui/layouts/LayoutWrapper';

/** Functions. */
import fetchPage from '@libs/general/dynamic-page/fetchPage';

/**
 * Render the HomePage component.
 *
 * @return {Element} The HomePage component.
 */
const HomePage = ({ page }) => (
	<Container className="py-10">
		<h1 className="text-4xl font-bold text-center">{page?.title}</h1>
	</Container>
);

/**
 * Prop Types.
 */
HomePage.propTypes = {
	page: PropTypes.shape({
		title: PropTypes.string,
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
		const data = await fetchPage(preview, 'homepage');
		return { props: { data } };
	} catch (error) {
		return { notFound: true };
	}
};

export default HomePage;
