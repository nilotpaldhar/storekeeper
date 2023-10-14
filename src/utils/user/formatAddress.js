/**
 * Formats address.
 */
const formatAddress = (address = {}) => ({
	id: address?.id,
	fullname: address?.name,
	street1: address?.street,
	street2: address?.street_2,
	country: address?.country,
	region: address?.county_state,
	city: address?.town_city,
	zip: address?.postal_zip_code,
	notes: address?.delivery_instructions,
	defaultShipping: address?.default_shipping,
	defaultBilling: address?.default_billing,
});

export default formatAddress;
