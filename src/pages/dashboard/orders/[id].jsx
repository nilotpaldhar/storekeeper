import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HTTP_STATUS } from '@constants';
import { fetchOrder } from '@store/slices/userOrder/userOrder.thunks';
import { selectStatus, selectError } from '@store/slices/userOrder/userOrder.selectors';

import Alert from '@ui/feedback/Alert';
import LoadingUI from '@ui/feedback/LoadingUI';
import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import DashboardOrderDetailsTmpl from '@templates/DashboardOrderDetails';
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';

/**
 * Render the DashboardOrderDetailsPage component.
 *
 * @return {Element} The DashboardOrderDetailsPage component.
 */
const DashboardOrderDetailsPage = ({ id }) => {
	const dispatch = useDispatch();

	const status = useSelector(selectStatus);
	const errMsg = useSelector(selectError);

	useEffect(() => {
		dispatch(fetchOrder(id));
	}, [id, dispatch]);

	return (
		<LoadingUI loading={status === HTTP_STATUS.idle || status === HTTP_STATUS.pending} height={400}>
			{status === HTTP_STATUS.failed && errMsg ? (
				<Alert type="error">
					<div className="flex space-x-1.5 items-center">
						<span>{errMsg} - </span>
						<button
							type="button"
							className="text-current hover:text-current font-semibold underline"
							onClick={() => dispatch(fetchOrder(id))}
						>
							Try Again!
						</button>
					</div>
				</Alert>
			) : (
				<DashboardOrderDetailsTmpl id={id} />
			)}
		</LoadingUI>
	);
};

/**
 * Prop Types.
 */
DashboardOrderDetailsPage.propTypes = {
	id: PropTypes.string.isRequired,
};

/** Page Layout. */
DashboardOrderDetailsPage.getLayout = (page, data) => (
	<LayoutWrapper data={data} layoutType="dashboard">
		{page}
	</LayoutWrapper>
);

/**
 * Get page props.
 *
 * @return {object} Page props.
 */
export const getServerSideProps = async ({ preview, params }) => {
	const page = {
		seo: {
			metaTitle: 'Order Details',
			shareTitle: 'Order Details',
		},
	};

	try {
		const { siteConfig } = await fetchSiteConfig(preview);
		return {
			props: {
				data: { siteConfig, page },
				id: params?.id,
			},
		};
	} catch (error) {
		return { notFound: true };
	}
};

export default DashboardOrderDetailsPage;
