import { HTTP_STATUS } from '@constants';

/** Components. */
import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import DashboardAccTmpl from '@templates/DashboardAccount';

/** Hooks & Functions. */
import { useSelector } from 'react-redux';
import { selectUserStatus } from '@store/slices/user/user.selectors';
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';

/**
 * Render the DashboardAccountPage component.
 *
 * @return {Element} The DashboardAccountPage component.
 */
const DashboardAccountPage = () => {
	const status = useSelector(selectUserStatus);
	return <DashboardAccTmpl loading={status === HTTP_STATUS.pending} />;
};

/** Page Layout. */
DashboardAccountPage.getLayout = (page, data) => (
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
			metaTitle: 'Account Details',
			shareTitle: 'Account Details',
		},
	};

	try {
		const { siteConfig } = await fetchSiteConfig(preview);
		return { props: { data: { siteConfig, page } } };
	} catch (error) {
		return { notFound: true };
	}
};

export default DashboardAccountPage;
