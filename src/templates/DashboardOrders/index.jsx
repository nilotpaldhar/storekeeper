import { useSelector, useDispatch } from 'react-redux';

import { HTTP_STATUS } from '@constants';
import * as actions from '@store/slices/userOrders/userOrders.thunks';
import * as selectors from '@store/slices/userOrders/userOrders.selectors';

import Empty from '@ui/feedback/Empty';
import RegularButton from '@ui/buttons/RegularButton';
import DashboardHeading from '@ui/dashboard/DashboardHeading';
import DashboardMHeader from '@ui/dashboard/DashboardMHeader';

import ChevronDownIcon from '@icons/regular/ChevronDown';
import OrderBox from './OrderBox';

/**
 * Render the DashboardOrdersTmpl component.
 *
 * @return {Element} The DashboardOrdersTmpl component.
 */
const DashboardOrdersTmpl = () => {
	const dispatch = useDispatch();

	const status = useSelector(selectors.selectStatus);
	const orders = useSelector(selectors.selectCollection);
	const pagination = useSelector(selectors.selectPagination);

	const totalOrders = orders.length;
	const totalOrdersTxt = totalOrders > 1 ? `${totalOrders} Items` : `${totalOrders} Item`;

	return (
		<>
			<DashboardMHeader href="/dashboard">
				<span>My Orders - </span>
				<span>{totalOrdersTxt}</span>
			</DashboardMHeader>
			<div>
				<DashboardHeading className="hidden md:block">
					<span>My Orders - </span>
					<span>{totalOrdersTxt}</span>
				</DashboardHeading>
				<div className="mt-8">
					{status === HTTP_STATUS.succeeded && orders.length > 0 ? (
						<>
							<ul className="flex flex-col space-y-4">
								{orders?.map((order) => (
									<li key={order?.id}>
										<OrderBox data={order} />
									</li>
								))}
							</ul>
							{pagination?.currentPage < pagination?.totalPages && (
								<div className="mt-8 lg:mt-12">
									<RegularButton
										fullWidth
										intent="primary-ghost"
										startIcon={ChevronDownIcon}
										onClick={() => dispatch(actions.loadMoreOrders(pagination.currentPage + 1))}
									>
										Load More
									</RegularButton>
								</div>
							)}
						</>
					) : (
						<Empty
							className="my-32"
							title="No result!"
							description="It seems like you haven't placed an order yet."
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default DashboardOrdersTmpl;
