import mapPrice from '@utils/general/mapPrice';
import formatAddress from '@utils/user/formatAddress';
import formatTokenData from '@utils/checkout/formatTokenData';

const formatOrder = async (data = {}) => {
	const mapTransaction = (transaction = {}) => ({
		amount: mapPrice(transaction?.amount),
		paymentSourceType: transaction?.payment_source_type,
		paymentSource: {
			brand: transaction?.payment_source?.brand,
			country: transaction?.payment_source?.country,
			zip: transaction?.payment_source?.billing_zip_postal_code,
		},
		...transaction,
	});

	return {
		id: data?.id,
		status: data?.status,
		sandbox: data?.sandbox,
		customer: {
			...data?.customer,
			reference: data?.customer_reference,
		},
		statusPayment: data?.status_payment,
		orderValue: mapPrice(data?.order_value),
		order: await formatTokenData(data?.order),
		statusFulfillment: data?.status_fulfillment,
		transactions: data?.transactions?.map(mapTransaction),
		placedAt: new Date(data.created * 1000).toLocaleString(),
		address: {
			billing: formatAddress(data?.billing),
			shipping: formatAddress(data?.shipping),
		},
	};
};

export default formatOrder;
