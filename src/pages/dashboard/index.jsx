/** Components. */
import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import DashboardHomeTmpl from '@templates/DashboardHome';

/** Hooks & Functions. */
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';

/**
 * Render the DashboardHomePage component.
 *
 * @return {Element} The DashboardHomePage component.
 */
const DashboardHomePage = () => <DashboardHomeTmpl />;

/** Page Layout. */
DashboardHomePage.getLayout = (page, data) => (
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
			metaTitle: 'Dashboard',
			shareTitle: 'Dashboard',
		},
	};

	try {
		const { siteConfig } = await fetchSiteConfig(preview);
		return { props: { data: { siteConfig, page } } };
	} catch (error) {
		return { notFound: true };
	}
};

export default DashboardHomePage;
