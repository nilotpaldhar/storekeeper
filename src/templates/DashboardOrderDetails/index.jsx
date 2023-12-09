import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import * as selectors from '@store/slices/userOrder/userOrder.selectors';

import ProductBox from '@ui/dashboard/ProductBox';
import AddressBox from '@ui/dashboard/AddressBox';
import DashboardHeading from '@ui/dashboard/DashboardHeading';
import DashboardMHeader from '@ui/dashboard/DashboardMHeader';

import MetaBox from './MetaBox';
import TotalPrice from './TotalPrice';
import ResendReceiptBtn from './ResendReceiptBtn';

/**
 * Render the DashboardOrderDetailsTmpl component.
 *
 * @return {Element} The DashboardOrderDetailsTmpl component.
 */
const DashboardOrderDetailsTmpl = ({ id }) => {
	const details = useSelector(selectors.selectDetails);
	const { items, shipping, subtotal, discount } = details?.order || {};

	return (
		<>
			<DashboardMHeader href="/dashboard/orders">Order Details</DashboardMHeader>
			<div className="flex flex-col space-y-6">
				<div className="flex flex-wrap items-center justify-between gap-4">
					<DashboardHeading className="hidden md:block">Order Details</DashboardHeading>
					<div className="flex-1 md:flex-initial">
						<ResendReceiptBtn id={id} />
					</div>
				</div>

				<div>
					<ul className="flex flex-col space-y-3">
						{items?.map((item) => (
							<li key={item?.id}>
								<ProductBox data={item} className="!border-solid" />
							</li>
						))}
					</ul>
				</div>

				<TotalPrice
					products={items}
					shipping={shipping?.price?.formattedWithSymbol}
					subTotal={subtotal?.formattedWithSymbol}
					grandTotal={details?.orderValue?.formattedWithSymbol}
					discount={discount?.amountSaved?.formattedWithSymbol}
				/>

				<AddressBox
					title="Shipping Address"
					data={{
						...details?.address?.shipping,
						email: details?.customer?.email,
						phone: details?.customer?.phone,
					}}
					hideDefault
				/>

				<AddressBox
					title="Billing Address"
					data={{
						...details?.address?.billing,
						email: details?.customer?.email,
						phone: details?.customer?.phone,
					}}
					hideDefault
				/>

				<MetaBox
					id={id}
					reference={details?.customer?.reference}
					placedAt={details?.placedAt}
					status={{
						order: details?.status,
						fulfillment: details?.statusFulfillment,
						payment: details?.statusPayment,
					}}
				/>
			</div>
		</>
	);
};

DashboardOrderDetailsTmpl.propTypes = {
	id: PropTypes.string.isRequired,
};

export default DashboardOrderDetailsTmpl;
