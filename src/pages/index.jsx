import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import Container from '@ui/general/Container';
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';

/**
 * Render the Homepage component.
 *
 * @return {Element} The Homepage component.
 */
const Homepage = () => (
	<Container className="py-10">
		<h1 className="text-4xl font-bold text-center">Home Page</h1>
	</Container>
);

/** Page Layout. */
Homepage.getLayout = (page, data) => <LayoutWrapper data={data}>{page}</LayoutWrapper>;

/**
 * Get page props.
 *
 * @return {object} Page props.
 */
export const getStaticProps = async () => {
	try {
		const data = await fetchSiteConfig(false);
		return { props: { data } };
	} catch (error) {
		return { notFound: true };
	}
};

export default Homepage;
