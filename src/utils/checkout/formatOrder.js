import mapPrice from '@utils/general/mapPrice';
import formatTokenData from '@utils/checkout/formatTokenData';

const formatOrder = async (data = {}) => {
	const mapAddress = (address = {}) => ({
		id: address?.id,
		country: address?.country,
		state: address?.county_state,
		zip: address?.postal_zip_code,
		street: address?.street,
		street2: address?.street_2,
		townCity: address?.town_city,
		customer: address?.name,
		deliveryInstructions: address?.delivery_instructions,
	});

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
		customer: data?.customer,
		statusPayment: data?.status_payment,
		orderValue: mapPrice(data?.order_value),
		order: await formatTokenData(data?.order),
		statusFulfillment: data?.status_fulfillment,
		transactions: data?.transactions?.map(mapTransaction),
		placedAt: new Date(data.created * 1000).toLocaleString(),
		address: {
			billing: mapAddress(data?.billing),
			shipping: mapAddress(data?.shipping),
		},
	};
};

export default formatOrder;
