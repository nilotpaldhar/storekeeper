/**
 * Cart cookie key.
 *
 * @type {string}
 */
export const CART_COOKIE_KEY = 'sk.cart_id';

/**
 * Wishlist cookie key.
 *
 * @type {string}
 */
export const WISHLIST_COOKIE_KEY = 'sk.wishlist_id';

/**
 * Cookie consent key.
 *
 * @type {string}
 */
export const COOKIE_CONSENT_KEY = 'sk.cookie_consent';

/**
 * Promo banner key.
 *
 * @type {string}
 */
export const PROMO_BANNER_KEY = 'sk.promo_banner';

/**
 * Algolia recent searches key.
 *
 * @type {string}
 */
export const ALGOLIA_RECENT_SEARCHES_KEY = 'sk.recent_search';

/**
 * Total product pages to be created initially (during build time).
 *
 * @type {number}
 */
export const PRODUCT_PATHS_LIMIT = 100;

/**
 * Total product category pages to be created initially (during build time).
 *
 * @type {number}
 */
export const PRODUCT_CATEGORY_PATHS_LIMIT = 50;

/**
 * Total product to be displayed in the search page.
 *
 * @type {number}
 */
export const PRODUCT_CATALOG_COUNT = 12;

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
 * Checkout steps.
 *
 * @type {array}
 */
export const CHECKOUT_STEPS = [
	{
		id: 'fill_user_details',
		label: 'User',
		description: 'User Details',
		completed: false,
	},
	{
		id: 'fill_address',
		label: 'Address',
		description: 'Shipping Address',
		completed: false,
	},
	{
		id: 'fill_shipping_options',
		label: 'Delivery',
		description: 'Delivery Methods',
		completed: false,
	},
	{
		id: 'fill_payment_details',
		label: 'Payment',
		description: 'Payment Options',
		completed: false,
	},
];

/**
 * Available payment gateways.
 *
 * @type {array}
 */
export const PAYMENT_GATEWAYS = [
	{
		id: 'test_gateway',
		title: 'Test Gateway',
		description: 'Description',
	},
	{
		id: 'stripe',
		title: 'Credit / Debit Card',
		description: 'Description',
	},
	{
		id: 'upi',
		title: 'UPI',
		description: 'Pay by any UPI app',
	},
	{
		id: 'net_banking',
		title: 'Net Banking',
		description: 'This instrument has low success, use UPI or cards for better experience',
	},
];

/**
 * Algolia index names.
 *
 * @type {object}
 */
export const ALGOLIA_INDEX = {
	product: 'dev_products',
	productPriceAsc: 'dev_products_price_asc',
	productPriceDesc: 'dev_products_price_desc',
	productQuerySuggestion: 'dev_products_query_suggestions',
};

/**
 * Algolia attribute names.
 *
 * @type {object}
 */
export const ALGOLIA_ATTRIBUTES = {
	category: 'categories.title',
	brand: 'brand',
	color: 'color',
	price: 'price.raw',
};
