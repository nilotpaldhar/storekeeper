import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchOrders } from '@store/slices/userOrders/userOrders.thunks';
import { selectStatus, selectError } from '@store/slices/userOrders/userOrders.selectors';
import { HTTP_STATUS } from '@constants';

import Alert from '@ui/feedback/Alert';
import LoadingUI from '@ui/feedback/LoadingUI';
import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import DashboardOrdersTmpl from '@templates/DashboardOrders';
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';

/**
 * Render the DashboardOrdersPage component.
 *
 * @return {Element} The DashboardOrdersPage component.
 */
const DashboardOrdersPage = () => {
	const dispatch = useDispatch();

	const status = useSelector(selectStatus);
	const errMsg = useSelector(selectError);

	useEffect(() => {
		if (status === HTTP_STATUS.idle) {
			dispatch(fetchOrders());
		}
	}, [status, dispatch]);

	return (
		<LoadingUI loading={status === HTTP_STATUS.idle || status === HTTP_STATUS.pending} height={400}>
			{status === HTTP_STATUS.failed && errMsg ? (
				<Alert type="error">
					<div className="flex space-x-1.5 items-center">
						<span>{errMsg} - </span>
						<button
							type="button"
							onClick={() => dispatch(fetchOrders())}
							className="text-current hover:text-current font-semibold underline"
						>
							Try Again!
						</button>
					</div>
				</Alert>
			) : (
				<DashboardOrdersTmpl />
			)}
		</LoadingUI>
	);
};

/** Page Layout. */
DashboardOrdersPage.getLayout = (page, data) => (
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
			metaTitle: 'Order History',
			shareTitle: 'Order History',
		},
	};

	try {
		const { siteConfig } = await fetchSiteConfig(preview);
		return { props: { data: { siteConfig, page } } };
	} catch (error) {
		return { notFound: true };
	}
};

export default DashboardOrdersPage;
