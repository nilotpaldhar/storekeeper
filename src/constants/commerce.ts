import type { CheckoutStep } from "@/types/domain.types";
import type { LineItem, Order, QueryFields } from "@commercelayer/sdk";

export const CART_COOKIE_KEY = "sk_cart_id";

export const CHECKOUT_STEPS = [
	{
		id: "fill_user_details",
		label: "User",
		description: "User Details",
		completed: false,
	},
	{
		id: "fill_address",
		label: "Address",
		description: "Delivery Address",
		completed: false,
	},
	{
		id: "fill_shipping_options",
		label: "Delivery",
		description: "Delivery Methods",
		completed: false,
	},
	{
		id: "fill_payment_details",
		label: "Payment",
		description: "Payment Options",
		completed: false,
	},
] as const satisfies CheckoutStep[];

export const ORDER_AND_CART_SUMMARY_FIELDS = [
	// ───── Order Identification & Localization ─────
	"number",
	"token",
	"customer_email",
	"language_code",
	"currency_code",
	"country_code",

	// ───── Order Status Lifecycle ─────
	"status",
	"payment_status",
	"fulfillment_status",

	// ───── Discounts, Coupons, and Gift Cards ─────
	"coupon_code",
	"gift_card_code",
	"discount_amount_cents",
	"formatted_discount_amount",
	"gift_card_amount_cents",
	"formatted_gift_card_amount",

	// ───── Financial Breakdown ─────
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

	// ───── Order Contents ─────
	"skus_count",

	// ───── Payment Source Info ─────
	"payment_source_details",

	// ───── Timestamps ─────
	"placed_at",
	"approved_at",
	"cancelled_at",
	"payment_updated_at",
	"fulfillment_updated_at",
	"refreshed_at",
	"created_at",
	"updated_at",
] as const satisfies QueryFields<Order>;

export const ORDER_AND_CART_LINE_ITEM_FIELDS = [
	// ───── Item Identification ─────
	"sku",
	"sku_code",
	"name",
	"quantity",
	"currency_code",

	// ───── Unit Pricing ─────
	"unit_amount_cents",
	"formatted_unit_amount",
	"compare_at_amount_cents",
	"formatted_compare_at_amount",

	// ───── Options/Extras Pricing ─────
	"options_amount_cents",
	"formatted_options_amount",

	// ───── Discounts ─────
	"discount_cents",
	"formatted_discount",

	// ───── Taxes ─────
	"tax_amount_cents",
	"formatted_tax_amount",

	// ───── Total for Line Item ─────
	"total_amount_cents",
	"formatted_total_amount",
] as const satisfies QueryFields<LineItem>;
