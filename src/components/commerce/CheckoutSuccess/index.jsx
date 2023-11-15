import PropTypes from 'prop-types';

/** Components */
import Empty from '@ui/feedback/Empty';
import Box from '@ui/data-display/Box';
import PriceRecap from '@ui/commerce/PriceRecap';
import ProductRecap from '@ui/commerce/ProductRecap';
import AddressSummary from '@ui/commerce/AddressSummary';
import DashIcon from '@icons/regular/Dash';

import { format } from 'date-fns';
import orderSuccessImg from '@public/order-success.svg';

/**
 * Render the CheckoutSuccess component.
 *
 * @return {Element} The CheckoutSuccess component.
 */
const CheckoutSuccess = ({ title, description, data }) => {
	const { items, shipping, subtotal, discount } = data?.order || {};
	const { paymentSourceType, paymentSource } = data?.transactions?.[0] || {};
	const divider = <div role="separator" className="hidden w-px h-14 bg-neutral-50 md:block" />;

	return (
		<div>
			<Empty
				title={title}
				imgSrc={orderSuccessImg}
				description={description}
				imgProps={{ alt: 'order success', width: 200, height: 200, priority: true }}
			/>
			<div className="flex flex-col space-y-14 max-w-xl mx-auto mt-16">
				<Box>
					<Box.Block className="px-3 lg:px-5 py-6">
						<div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:justify-between text-neutral-900">
							<div className="flex flex-row items-center justify-between md:flex-col md:justify-center">
								<div className="text-base font-semibold">Date</div>
								<div>
									{data?.placedAt ? (
										<span>{format(new Date(data?.placedAt), 'dd MMM, yyyy')}</span>
									) : (
										<DashIcon />
									)}
								</div>
							</div>
							{divider}
							<div className="flex flex-row items-center justify-between md:flex-col md:justify-center">
								<div className="text-base font-semibold">Order ID</div>
								<div>{data?.id}</div>
							</div>
							{divider}
							<div className="flex flex-row items-center justify-between md:flex-col md:justify-center">
								<div className="text-base font-semibold">Payment Method</div>
								<div className="flex items-center justify-center text-center">
									{paymentSource?.brand && paymentSourceType ? (
										<>
											<div className="capitalize">{paymentSource?.brand}</div>
											<div className="capitalize ml-1">{paymentSourceType}</div>
										</>
									) : (
										<DashIcon />
									)}
								</div>
							</div>
						</div>
					</Box.Block>
					<Box.Divider />
					<Box.Block className="px-3 lg:px-5">
						<ProductRecap products={items} />
					</Box.Block>
					<Box.Divider />
					<PriceRecap
						subTotal={subtotal?.formattedWithSymbol}
						grandTotal={data?.orderValue?.formattedWithSymbol}
						discount={discount?.amountSaved?.formattedWithSymbol}
						shipping={shipping?.price?.formattedWithSymbol}
						hideTaxIfEmpty={false}
						tax={null}
					/>
				</Box>
				<AddressSummary
					title="Billing Address"
					customer={data?.customer}
					address={data?.address?.billing}
				/>
				<AddressSummary
					title="Shipping Address"
					customer={data?.customer}
					address={data?.address?.shipping}
				/>
			</div>
		</div>
	);
};

/**
 * Default Props.
 */
CheckoutSuccess.defaultProps = {
	title: 'Thank you for your purchase!',
	description:
		'Your order will be processed within 24 hours during working days. We will notify you by email once your order has been shipped.',
};

/**
 * Prop Types.
 */
CheckoutSuccess.propTypes = {
	title: PropTypes.node,
	description: PropTypes.node,
	data: PropTypes.shape({
		id: PropTypes.string,
		placedAt: PropTypes.string,
		order: PropTypes.shape({}),
		customer: PropTypes.shape({}),
		transactions: PropTypes.arrayOf(PropTypes.shape({})),
		orderValue: PropTypes.shape({ formattedWithSymbol: PropTypes.string }),
		address: PropTypes.shape({
			billing: PropTypes.shape({}),
			shipping: PropTypes.shape({}),
		}),
	}).isRequired,
};

export default CheckoutSuccess;
