import axios from 'axios';

const BASE_URL = '/api/commerce/checkout';

/** Get available shipping countries. */
export const fetchShippingCountries = async (id) => {
	const REQ_URL = `${BASE_URL}/shipping/countries?id=${id}`;
	try {
		const res = await axios.get(REQ_URL);
		return res?.data?.data?.countries;
	} catch (error) {
		return [];
	}
};

/** Get available shipping regions. */
export const fetchShippingRegions = async (id, country) => {
	const REQ_URL = `${BASE_URL}/shipping/subdivisions?id=${id}&country=${country}`;
	try {
		const res = await axios.get(REQ_URL);
		return res?.data?.data?.subdivisions;
	} catch (error) {
		return [];
	}
};

/** Get shipping options. */
export const fetchShippingOptions = async (id, country, region) => {
	const REQ_URL = `${BASE_URL}/shipping/options?id=${id}&country=${country}&region=${region}`;
	try {
		const res = await axios.get(REQ_URL);
		return res?.data?.data?.options?.map((option) => ({
			id: option?.id,
			label: option?.description,
			price: option?.price?.formattedWithSymbol,
		}));
	} catch (error) {
		return [];
	}
};

/** Add shipping option. */
export const addShippingOption = async (id, options = {}) => {
	const res = await axios.post(`${BASE_URL}/order/add-shipping`, { id, ...options });
	return res?.data?.data;
};

/** Add tax zone. */
export const addTaxZone = async (id, options = {}) => {
	const res = await axios.post(`${BASE_URL}/order/add-tax-zone`, { id, ...options });
	return res?.data?.data;
};

/** Capture order. */
export const captureOrder = async (data) => {
	const { id, items, orderDetails } = data;

	const tranformAddress = (address) => ({
		name: address?.fullname,
		street: address?.street1,
		street_2: address?.street2,
		town_city: address?.city,
		postal_zip_code: address?.zip,
		county_state: address?.region,
		country: address?.country,
		delivery_instructions: address?.notes,
	});

	const lineItems = Object.fromEntries(
		items?.map((item) => [
			item?.id,
			{
				quantity: `${item?.quantity}`,
				selected_options: Object.fromEntries(
					item?.selectedOptions?.map((option) => [option?.group?.id, option?.id])
				),
			},
		])
	);

	const order = {
		id: id,
		payload: {
			line_items: lineItems,
			customer: orderDetails?.customer,
			shipping: tranformAddress(orderDetails?.shipping),
			billing: tranformAddress(orderDetails?.billing),
			payment: orderDetails?.payment,
		},
	};

	const res = await axios.post(`${BASE_URL}/order/capture`, order);
	return res?.data?.data;
};
