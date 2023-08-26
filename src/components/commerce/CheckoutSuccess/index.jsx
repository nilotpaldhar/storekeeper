import PropTypes from 'prop-types';
import Empty from '@ui/feedback/Empty';
import OrderSummary from '@ui/commerce/OrderSummary';
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
	const { items, shipping, subtotal, discount, tax } = data?.order || {};
	const { paymentSourceType, paymentSource } = data?.transactions?.[0] || {};

	return (
		<div>
			<Empty
				title={title}
				imgSrc={orderSuccessImg}
				description={description}
				imgProps={{ alt: 'order success', width: 200, height: 200 }}
			/>
			<div className="flex flex-col space-y-14 max-w-xl mx-auto mt-16">
				<OrderSummary
					products={items}
					displayTitle={false}
					subtotal={subtotal?.formattedWithSymbol}
					total={data?.orderValue?.formattedWithSymbol}
					discount={discount?.amountSaved?.formattedWithSymbol}
					tax={tax?.amount?.raw > 0 ? tax?.amount?.formattedWithSymbol : null}
					shipping={shipping?.price?.raw > 0 ? shipping?.price?.formattedWithSymbol : null}
					contentPrefix={
						<div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:justify-between mb-8 pb-8 border-b border-neutral-50 text-neutral-900">
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
							<div className="hidden w-px h-14 bg-neutral-50 md:block" />
							<div className="flex flex-row items-center justify-between md:flex-col md:justify-center">
								<div className="text-base font-semibold">Order ID</div>
								<div>{data?.id}</div>
							</div>
							<div className="hidden w-px h-14 bg-neutral-50 md:block" />
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
					}
				/>
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
