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
 * Dashboard menus.
 *
 * @type {array}
 */
export const DASHBOARD_MENUS = [
	{
		id: '48fade24-0fd6-4fdd-a30c-b8648d887c15',
		title: null,
		links: [
			{
				id: 'c7602c16-9a1f-4782-86c8-ac0458c2aa4e',
				label: 'Overview',
				href: '/dashboard',
			},
		],
	},
	{
		id: '3826dbcb-3927-46d1-8aa9-09a085950e72',
		title: 'Account',
		links: [
			{
				id: 'a981ab24-7864-4b31-97c7-026d66babed2',
				label: 'Profile Details',
				href: '/dashboard/profile',
			},
			{
				id: '4189a62e-0a8b-444e-a977-e139e1492d72',
				label: 'Saved Addresses',
				href: '/dashboard/address',
			},
		],
	},
	{
		id: '07951c58-cf98-4e0d-b98e-534d0b1bf3d2',
		title: 'Orders',
		links: [
			{
				id: 'ff724335-3827-4b7a-aaf0-5c92d7f8e9b2',
				label: 'Recent Orders',
				href: '/dashboard/orders',
			},
		],
	},
];

/**
 * Dashboard menus.
 *
 * @type {array}
 */
export const DASHBOARD_OVERVIEW_LINKS = [
	{
		id: 'overview_orders',
		title: 'Orders',
		description: 'Check your recent order status',
		href: '/dashboard/orders',
	},
	{
		id: 'overview_wishlist',
		title: 'Wishlist',
		description: 'All your curated product collections',
		href: '/wishlist',
	},
	{
		id: 'overview_addresses',
		title: 'Addresses',
		description: 'Save addresses for a hassle-free checkout',
		href: '/dashboard/address',
	},
	{
		id: 'overview_profile',
		title: 'Profile Details',
		description: 'Change your profile details',
		href: '/dashboard/profile',
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
