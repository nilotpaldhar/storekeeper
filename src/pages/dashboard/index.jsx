import { signOut } from 'next-auth/react';

/** Components. */
import Container from '@ui/general/Container';
import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import RegularButton from '@ui/buttons/RegularButton';

/** Functions. */
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';

/**
 * Render the DashboardPage component.
 *
 * @return {Element} The DashboardPage component.
 */
const DashboardPage = () => (
	<Container className="py-10 flex flex-col space-y-5 items-center justify-center text-center">
		<h1 className="text-3xl font-bold">Dashboard Page</h1>
		<RegularButton onClick={() => signOut({ callbackUrl: '/login' })}>Logout</RegularButton>
	</Container>
);

/** Page Layout. */
DashboardPage.getLayout = (page, data) => <LayoutWrapper data={data}>{page}</LayoutWrapper>;

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

export default DashboardPage;
