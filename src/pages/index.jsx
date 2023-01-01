import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';

/**
 * Render the Homepage component.
 *
 * @return {Element} The Homepage component.
 */
const Homepage = () => (
	<main>
		<section className="text-base font-semibold py-60">Homepage</section>
	</main>
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
