import type { LineItem, Order, Price, StockItem } from "@commercelayer/sdk";
import type { User } from "@prisma/client";

import { z } from "zod";
import { AddressSchema } from "@/lib/schemas";

// ─────────────────────────────────────────────────────
// Utility Types
// ─────────────────────────────────────────────────────

/**
 * Represents a standardized result from any operation, including success or failure.
 */
export type OperationResult<TData = undefined, TReason extends string = "UNKNOWN"> =
	| { ok: true; data?: TData }
	| { ok: false; reason: TReason; detail?: string };

// ─────────────────────────────────────────────────────
// User & Identity Types
// ─────────────────────────────────────────────────────

/**
 * Alias for the user profile from the Prisma client.
 */
export type UserProfile = User;

// ─────────────────────────────────────────────────────
// Commerce Primitives
// ─────────────────────────────────────────────────────

export type ProductPrice = Price;
export type ProductInventory = StockItem;

// ─────────────────────────────────────────────────────
// Product Entity Types (core definitions)
// ─────────────────────────────────────────────────────

export type ProductSku = {
	id: string;
	code: string | null;
	name: string | null;
	description: string | null;
	imageUrl: string | null;
	piecesPerPack: number | null;
	weight: number | null;
	unitOfWeight: string | null;
	hsTariffNumber: string | null;
};

export type ProductBrand = {
	id: string;
	title: string;
	slug: string;
};

export type ProductImage = {
	refKey: string;
	src: string | null;
	alt: string | null;
};

export type ProductOption = {
	refKey: string;
	name: string;
	values: Array<string>;
};

export type ProductVariant = {
	refKey: string;
	variantKey: string;
	sku: ProductSku | null;
	gallery: ProductImage[];
};

export type ProductSpecification = {
	refKey: string;
	label: string;
	value: string;
};

export type ProductBreadcrumb = {
	id: string;
	label: string;
	path: string;
}[];

// ─────────────────────────────────────────────────────
// Product Aggregates (composite types for UI/pages)
// ─────────────────────────────────────────────────────

export type ProductDetails = {
	id: string;
	title: string;
	slug: string;
	description: string | null;
	hasVariants: boolean;
	brand: ProductBrand | null;
	options: ProductOption[];
	variants: ProductVariant[];
	specifications: ProductSpecification[];
	sku: ProductSku | null;
	gallery: ProductImage[];
	breadcrumb: ProductBreadcrumb;
};

export type ProductSummary = {
	_key: string | null;
	id: string;
	title: string;
	slug: string;
	category: string;
	description: string | null;
	hasVariants: boolean;
	variants: ProductVariant[];
	sku: ProductSku | null;
	gallery: ProductImage[];
	price: ProductPrice | null;
};

// ─────────────────────────────────────────────────────
// Cart & Order Core Types
// ─────────────────────────────────────────────────────

/**
 * Alias for a Commerce Layer order representing a cart.
 */
export type Cart = Order;

/**
 * Represents the count of SKUs in a cart or order.
 */
export type CartCount = Pick<Order, "skus_count">;

/**
 * Shared summary type for both carts and orders.
 */
export type CheckoutSummary = Pick<
	Order,
	| "id"
	| "type"
	| "number"
	| "token"
	| "customer_email"
	| "language_code"
	| "currency_code"
	| "country_code"
	| "status"
	| "payment_status"
	| "fulfillment_status"
	| "coupon_code"
	| "gift_card_code"
	| "discount_amount_cents"
	| "formatted_discount_amount"
	| "gift_card_amount_cents"
	| "formatted_gift_card_amount"
	| "subtotal_amount_cents"
	| "formatted_subtotal_amount"
	| "shipping_amount_cents"
	| "formatted_shipping_amount"
	| "payment_method_amount_cents"
	| "formatted_payment_method_amount"
	| "adjustment_amount_cents"
	| "formatted_adjustment_amount"
	| "total_tax_amount_cents"
	| "formatted_total_tax_amount"
	| "fees_amount_cents"
	| "formatted_fees_amount"
	| "place_total_amount_cents"
	| "formatted_place_total_amount"
	| "total_amount_cents"
	| "formatted_total_amount"
	| "total_amount_with_taxes_cents"
	| "formatted_total_amount_with_taxes"
	| "skus_count"
	| "payment_source_details"
	| "placed_at"
	| "approved_at"
	| "cancelled_at"
	| "payment_updated_at"
	| "fulfillment_updated_at"
	| "refreshed_at"
	| "created_at"
	| "updated_at"
>;

/**
 * Shared line item shape for both carts and orders.
 */
export type CheckoutLineItem = Pick<
	LineItem,
	| "id"
	| "type"
	| "sku"
	| "sku_code"
	| "name"
	| "quantity"
	| "currency_code"
	| "unit_amount_cents"
	| "formatted_unit_amount"
	| "compare_at_amount_cents"
	| "formatted_compare_at_amount"
	| "options_amount_cents"
	| "formatted_options_amount"
	| "discount_cents"
	| "formatted_discount"
	| "tax_amount_cents"
	| "formatted_tax_amount"
	| "total_amount_cents"
	| "formatted_total_amount"
> & {
	product: {
		id: string;
		title: string;
		slug: string;
		thumbnail: {
			src: string | null;
			alt?: string | null;
		} | null;
	} | null;
};

// ─────────────────────────────────────────────────────
// Cart & Order Aliases (specific naming conveniences)
// ─────────────────────────────────────────────────────

export type CartSummary = CheckoutSummary;
export type CartLineItem = CheckoutLineItem;

export type OrderSummary = CheckoutSummary;
export type OrderLineItem = CheckoutLineItem;

export type OrderStatus = Order["status"];

// ─────────────────────────────────────────────────────
// Checkout Flow Types
// ─────────────────────────────────────────────────────

/**
 * Represents a single step in the checkout process.
 */
export type CheckoutStep = {
	id: string;
	label: string;
	description: string;
	completed: boolean;
};

/**
 * Zod-powered address input form shape.
 */
export type AddressInput = z.infer<typeof AddressSchema>;

/**
 * Address shape used for storage/records.
 */
export type AddressRecord = z.infer<typeof AddressSchema> & {
	id: string;
	type: "addresses";
};

// ─────────────────────────────────────────────────────
// Marketing & Display Types (non-commerce)
// ─────────────────────────────────────────────────────

export type MediaImage = {
	src: string | null;
	alt: string | null;
};

export type PromoBlock = {
	id: string;
	title: string;
	description: string | null;
	contentAlignment: "left" | "right";
	thumbnail: MediaImage;
	backdrop: MediaImage | null;
	price: {
		label: string;
		amount: string;
	};
	link: {
		label: string;
		resource: {
			type: "page" | "product" | "taxonomy" | "taxon" | null;
			slug: string | null;
		} | null;
	};
};

export type CollectionSummary = {
	id: string;
	title: string;
	slug: string;
	description: string | null;
	thumbnail: MediaImage | null;
};

export type HomePage = {
	id: string;
	title: string;
	promoSection: {
		hidden: boolean;
		items: PromoBlock[];
	};
	categorySection: {
		title: string;
		hidden: boolean;
		items: {
			id: string;
			title: string;
			slug: string;
			thumbnail: MediaImage;
		}[];
	};
	collectionSection: {
		hidden: boolean;
		items: CollectionSummary[];
	};
	productSections: {
		refKey: string;
		title: string;
		hidden: boolean;
		products: ProductSummary[];
	}[];
};
