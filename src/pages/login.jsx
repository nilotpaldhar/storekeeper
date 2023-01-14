import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import Container from '@ui/general/Container';
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';

/**
 * Render the LoginPage component.
 *
 * @return {Element} The LoginPage component.
 */
const LoginPage = () => (
	<Container className="py-10">
		<h1 className="text-3xl font-bold text-center">Login Page</h1>
	</Container>
);

/** Page Layout. */
LoginPage.getLayout = (page, data) => (
	<LayoutWrapper layoutType="auth" data={data}>
		{page}
	</LayoutWrapper>
);

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

export default LoginPage;
