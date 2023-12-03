import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';

import { useSelector } from 'react-redux';
import { selectUserAbout, selectUserAuthStatus } from '@store/slices/user/user.selectors';

/**
 * Render the DashboardHomePage component.
 *
 * @return {Element} The DashboardHomePage component.
 */
const DashboardHomePage = () => {
	const about = useSelector(selectUserAbout);
	const authStatus = useSelector(selectUserAuthStatus);

	return (
		<div className="p-16">
			<h1 className="font-bold text-2xl mb-6">DashboardHomePage :{authStatus}</h1>
			<div className="prose-sm">
				<pre className="mb-10">{JSON.stringify(about)}</pre>
			</div>
		</div>
	);
};

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
