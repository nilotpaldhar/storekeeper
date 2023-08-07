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
};
