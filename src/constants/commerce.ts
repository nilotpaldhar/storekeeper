import type { CheckoutStep } from "@/types/domain.types";
import type { LineItem, Order, PaymentMethod, QueryFields } from "@commercelayer/sdk";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * CART & ORDER CONSTANTS
 * ────────────────────────────────────────────────────────────────────────────────
 */

// Key used to store cart ID in cookies
export const CART_COOKIE_KEY = "sk_cart_id";

// Order statuses that are valid for treating an order as a cart
export const VALID_CART_STATUS = ["draft", "pending", "editing", "placing"] as const;

// Order statuses that are invalid for checkout (i.e., cannot proceed)
export const INVALID_CHECKOUT_ORDER_STATUS = [
	"approved",
	"cancelled",
	"placed",
	"editing",
	"placing",
] as const;

// Currently supported payment source types in the app
export const SUPPORTED_PAYMENT_SOURCE = [
	"wire_transfers",
] as const satisfies PaymentMethod["payment_source_type"][];

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * CHECKOUT FLOW
 * ────────────────────────────────────────────────────────────────────────────────
 */

// Steps in the checkout process used for UI navigation and logic
export const CHECKOUT_STEPS = [
	{
		id: "user_info",
		label: "User",
		description: "User Info",
		completed: false,
	},
	{
		id: "shipping_address",
		label: "Address",
		description: "Shipping Address",
		completed: false,
	},
	{
		id: "shipping_method",
		label: "Delivery",
		description: "Delivery Method",
		completed: false,
	},
	{
		id: "payment_method",
		label: "Payment",
		description: "Payment Method",
		completed: false,
	},
	{
		id: "review_order",
		label: "Review",
		description: "Review & Place",
		completed: false,
	},
] as const satisfies CheckoutStep[];

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * ORDER & CART FIELD SELECTIONS
 * ────────────────────────────────────────────────────────────────────────────────
 */

// Fields used when retrieving a cart or order summary from Commerce Layer
export const ORDER_AND_CART_SUMMARY_FIELDS = [
	// ── Order Identification & Localization ──
	"number",
	"token",
	"customer_email",
	"language_code",
	"currency_code",
	"country_code",

	// ── Order Status Lifecycle ──
	"status",
	"payment_status",
	"fulfillment_status",

	// ── Discounts, Coupons, and Gift Cards ──
	"coupon_code",
	"gift_card_code",
	"discount_amount_cents",
	"formatted_discount_amount",
	"gift_card_amount_cents",
	"formatted_gift_card_amount",

	// ── Financial Breakdown ──
	"subtotal_amount_cents",
	"formatted_subtotal_amount",
	"shipping_amount_cents",
	"formatted_shipping_amount",
	"payment_method_amount_cents",
	"formatted_payment_method_amount",
	"adjustment_amount_cents",
	"formatted_adjustment_amount",
	"total_tax_amount_cents",
	"formatted_total_tax_amount",
	"fees_amount_cents",
	"formatted_fees_amount",
	"place_total_amount_cents",
	"formatted_place_total_amount",
	"total_amount_cents",
	"formatted_total_amount",
	"total_amount_with_taxes_cents",
	"formatted_total_amount_with_taxes",

	// ── Order Contents ──
	"skus_count",

	// ── Payment Source Info ──
	"payment_source_details",

	// ── Timestamps ──
	"placed_at",
	"approved_at",
	"cancelled_at",
	"payment_updated_at",
	"fulfillment_updated_at",
	"refreshed_at",
	"created_at",
	"updated_at",
] as const satisfies QueryFields<Order>;

// Fields used when retrieving line items for an order/cart
export const ORDER_AND_CART_LINE_ITEM_FIELDS = [
	// ── Item Identification ──
	"sku",
	"sku_code",
	"name",
	"quantity",
	"currency_code",

	// ── Unit Pricing ──
	"unit_amount_cents",
	"formatted_unit_amount",
	"compare_at_amount_cents",
	"formatted_compare_at_amount",

	// ── Options/Extras Pricing ──
	"options_amount_cents",
	"formatted_options_amount",

	// ── Discounts ──
	"discount_cents",
	"formatted_discount",

	// ── Taxes ──
	"tax_amount_cents",
	"formatted_tax_amount",

	// ── Total for Line Item ──
	"total_amount_cents",
	"formatted_total_amount",
] as const satisfies QueryFields<LineItem>;

export const ALGOLIA_INDEXES = {
	PRODUCTS: "products",
	PRODUCTS_PRICE_ASC: "products_price_asc",
	PRODUCTS_PRICE_DESC: "products_price_desc",
	PRODUCTS_QUERY_SUGGESTION: "products_query_suggestions",
} as const;

export const ALGOLIA_FACET_ATTRIBUTES = {
	TAXONOMY: "taxonomy",
	TAXON: "taxon",
	BRAND: "brand",
	PRICE: "price.amount_float",
} as const;

export const ALGOLIA_RECENT_SEARCHES_KEY = "sk.recent_search" as const;

export const ALGOLIA_SEARCH_QUERY_KEY = `${ALGOLIA_INDEXES.PRODUCTS}[query]` as const;

export const SEARCH_RESULTS_PER_PAGE = 12 as const;
