import "server-only";

import type { Cart, CartLineItem, CartSummary } from "@/types/domain.types";

import { getCommerceLayerClient } from "@/lib/clients/commerce";
import { logEvent } from "@/lib/logging/log-event";
import { attachProductToLineItem } from "@/lib/resources/cart/services";

/**
 * Fetches a single draft Order (cart) by its Commerce Layer ID.
 * This is used to validate or rehydrate an existing guest/user cart.
 */
const getCartById = async ({ id }: { id: string }): Promise<Cart | null> => {
	const clClient = await getCommerceLayerClient();

	try {
		const cart = await clClient.orders.retrieve(id);
		return cart;
	} catch (err) {
		logEvent({
			fn: "getCartById",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

/**
 * Queries Commerce Layer for an existing draft Order (cart)
 * that matches the given customer email.
 * Only the first matching cart is returned (if any).
 */
const getCartByUserEmail = async ({ email }: { email: string }): Promise<Cart | null> => {
	const clClient = await getCommerceLayerClient();

	try {
		const carts = await clClient.orders.list({
			filters: {
				customer_email_eq: email,
			},
		});
		return carts.at(0) ?? null;
	} catch (err) {
		logEvent({
			fn: "getCartByUserEmail",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

/**
 * Retrieves a summary of a cart (order) from Commerce Layer.
 */
const getCartSummary = async ({ id }: { id: string }): Promise<CartSummary | null> => {
	const clClient = await getCommerceLayerClient();

	try {
		const cartSummary = await clClient.orders.retrieve(id, {
			fields: [
				"number",
				"skus_count",
				"coupon_code",
				"formatted_subtotal_amount",
				"formatted_discount_amount",
				"formatted_shipping_amount",
				"formatted_total_tax_amount",
				"formatted_gift_card_amount",
				"formatted_total_amount_with_taxes",
			],
		});
		return cartSummary ?? null;
	} catch (err) {
		logEvent({
			fn: "getCartSummary",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

/**
 * Retrieves and enriches cart line items for a given order ID.
 */
const getCartLineItems = async ({ id }: { id: string }): Promise<CartLineItem[]> => {
	const clClient = await getCommerceLayerClient();

	try {
		// Fetch raw line items for the given order ID.
		const lineItems = await clClient.orders.line_items(id, {
			filters: { item_type_eq: "skus" },
			include: ["sku"],
			fields: [
				"sku",
				"sku_code",
				"name",
				"quantity",
				"currency_code",
				"formatted_unit_amount",
				"formatted_compare_at_amount",
				"formatted_options_amount",
				"formatted_discount",
				"formatted_total_amount",
				"formatted_tax_amount",
			],
		});

		// Enrich each line item with product data.
		const enrichedItems = await Promise.all(
			lineItems.map((lineItem) => attachProductToLineItem({ lineItem }))
		);

		return enrichedItems;
	} catch (err) {
		logEvent({
			fn: "getCartLineItems",
			level: "error",
			event: "fail",
			error: err,
		});
		return [];
	}
};

export { getCartById, getCartByUserEmail, getCartSummary, getCartLineItems };
