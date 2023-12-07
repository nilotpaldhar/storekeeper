import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import DashboardAddressTmpl from '@templates/DashboardAddress';
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';

/**
 * Render the DashboardAddressPage component.
 *
 * @return {Element} The DashboardAddressPage component.
 */
const DashboardAddressPage = () => <DashboardAddressTmpl />;

/** Page Layout. */
DashboardAddressPage.getLayout = (page, data) => (
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
			metaTitle: 'Manage Addresses',
			shareTitle: 'Manage Addresses',
		},
	};

	try {
		const { siteConfig } = await fetchSiteConfig(preview);
		return { props: { data: { siteConfig, page } } };
	} catch (error) {
		return { notFound: true };
	}
};

export default DashboardAddressPage;
