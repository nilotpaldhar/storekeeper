/**
 * Cart cookie key.
 *
 * @type {string}
 */
export const CART_COOKIE_KEY = 'sk.cart_id';

/**
 * Cookie consent key.
 *
 * @type {string}
 */
export const COOKIE_CONSENT_KEY = 'sk.cookie_consent';

/**
 * HTTP status states.
 *
 * @type {object}
 */
export const HTTP_STATUS = {
	idle: 'IDLE',
	pending: 'PENDING',
	succeeded: 'SUCCEEDED',
	failed: 'FAILED',
};

/**
 * The total product pages to be created initially (during build time).
 *
 * @type {number}
 */
export const PRODUCT_PATHS_LIMIT = 100;

/**
 * Promo banner key.
 *
 * @type {string}
 */
export const PROMO_BANNER_KEY = 'sk.promo_banner';

/**
 * Checkout steps.
 *
 * @type {array}
 */
export const CHECKOUT_STEPS = [
	{
		sn: 1,
		id: 'c45b6234-d3dc-42b2-9210-2e6a9a91b233',
		key: 'fill_customer_details',
		description: 'Customer',
	},
	{
		sn: 2,
		id: '723cd491-7f61-4b6a-93ae-d3bc58aa07e3',
		key: 'fill_delivery_address',
		description: 'Delivery Address',
	},
	{
		sn: 3,
		id: 'b91dd84d-182a-4582-ab2b-3bfbd8829ea1',
		key: 'fill_shipping_options',
		description: 'Shipping Options',
	},
	{
		sn: 4,
		id: '5f9784f7-056c-4bac-8410-42c8e5a5a5dd',
		key: 'fill_payment_details',
		description: 'Payment',
	},
];
