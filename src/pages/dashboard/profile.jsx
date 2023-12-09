import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import DashboardProfileTmpl from '@templates/DashboardProfile';
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';

/**
 * Render the DashboardProfilePage component.
 *
 * @return {Element} The DashboardProfilePage component.
 */
const DashboardProfilePage = () => <DashboardProfileTmpl />;

/** Page Layout. */
DashboardProfilePage.getLayout = (page, data) => (
	<LayoutWrapper data={data} layoutType="dashboard">
		{page}
	</LayoutWrapper>
);

/**
 * Get page props.
 *
 * @return {object} Page props.
 */
export const getStaticProps = async ({ preview }) => {
	const page = {
		seo: {
			metaTitle: 'Profile Details',
			shareTitle: 'Profile Details',
		},
	};

	try {
		const { siteConfig } = await fetchSiteConfig(preview);
		return { props: { data: { siteConfig, page } } };
	} catch (error) {
		return { notFound: true };
	}
};

export default DashboardProfilePage;
