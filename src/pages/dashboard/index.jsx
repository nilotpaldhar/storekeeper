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
	<Container className="flex flex-col items-center justify-center py-10 space-y-5 text-center">
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
export const getStaticProps = async ({ preview }) => {
	try {
		const data = await fetchSiteConfig(preview);
		return { props: { data } };
	} catch (error) {
		return { notFound: true };
	}
};

export default DashboardPage;
