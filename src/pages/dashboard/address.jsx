import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAddresses } from '@store/slices/userAddress/userAddress.thunks';
import { selectStatus, selectError } from '@store/slices/userAddress/userAddress.selectors';
import { HTTP_STATUS } from '@constants';

import Alert from '@ui/feedback/Alert';
import LoadingUI from '@ui/feedback/LoadingUI';
import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import DashboardAddressTmpl from '@templates/DashboardAddress';
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';

/**
 * Render the DashboardAddressPage component.
 *
 * @return {Element} The DashboardAddressPage component.
 */
const DashboardAddressPage = () => {
	const dispatch = useDispatch();

	const status = useSelector(selectStatus);
	const errMsg = useSelector(selectError);

	useEffect(() => {
		if (status === HTTP_STATUS.idle) {
			dispatch(fetchAddresses());
		}
	}, [status, dispatch]);

	return (
		<LoadingUI loading={status === HTTP_STATUS.idle || status === HTTP_STATUS.pending} height={400}>
			{status === HTTP_STATUS.failed && errMsg ? (
				<Alert type="error">
					<div className="flex space-x-1.5 items-center">
						<span>{errMsg}.</span>
						<button
							type="button"
							className="text-current hover:text-current font-semibold underline"
							onClick={() => dispatch(fetchAddresses())}
						>
							Try Again!
						</button>
					</div>
				</Alert>
			) : (
				<DashboardAddressTmpl />
			)}
		</LoadingUI>
	);
};

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
