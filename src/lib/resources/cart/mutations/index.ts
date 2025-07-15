import "server-only";

import type { Cart, CartLineItem, OperationResult } from "@/types/domain.types";

import { getCommerceLayerClient } from "@/lib/clients/commerce";
import { logEvent } from "@/lib/logging/log-event";
import { attachProductToLineItem } from "@/lib/resources/cart/services";
import { getDefaultMarket } from "@/lib/resources/markets/fetch";
import { isCLApiError } from "@/lib/utils/commerce/errors";

/**
 * Creates a new draft Order in Commerce Layer,
 * associated with the specified Market.
 * This represents a new cart for either a guest or a logged-in user.
 */
const createCart = async (): Promise<Cart | null> => {
	const clClient = await getCommerceLayerClient();

	const defaultMarket = await getDefaultMarket();
	if (!defaultMarket) {
		logEvent({
			fn: "createCart",
			level: "error",
			event: "fail",
			error: { message: "Default market not found!" },
		});
		return null;
	}

	try {
		const newCart = await clClient.orders.create({
			market: { id: defaultMarket.id, type: "markets" },
		});
		return newCart;
	} catch (err) {
		logEvent({
			fn: "createCart",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

/**
 * Deletes a draft Order (cart) in Commerce Layer by its ID.
 * Used for cleaning up stale guest carts when switching to a user cart.
 */
const deleteCart = async ({ id }: { id: string }): Promise<boolean> => {
	const clClient = await getCommerceLayerClient();

	try {
		await clClient.orders.delete(id);
		return true;
	} catch (err) {
		logEvent({
			fn: "deleteCart",
			level: "error",
			event: "fail",
			error: err,
		});
		return false;
	}
};

/**
 * Attaches an existing draft Order (cart) to a customer by setting the customer email.
 * This converts a guest cart into a user cart.
 */
const attachCartToUser = async ({
	cartId,
	userEmail,
}: {
	cartId: string;
	userEmail: string;
}): Promise<Cart | null> => {
	const clClient = await getCommerceLayerClient();

	try {
		const updatedCart = await clClient.orders.update({
			id: cartId,
			customer_email: userEmail,
		});
		return updatedCart;
	} catch (err) {
		logEvent({
			fn: "attachCartToUser",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

/**
 * Adds a new line item to a cart in Commerce Layer.
 */
const addCartItem = async ({
	cartId,
	skuCode,
	quantity = 1,
}: {
	cartId: string;
	skuCode: string;
	quantity?: number;
}): Promise<CartLineItem | null> => {
	const clClient = await getCommerceLayerClient();

	try {
		const lineItem = await clClient.line_items.create(
			{
				sku_code: skuCode,
				quantity,
				order: {
					id: cartId,
					type: "orders",
				},
				_update_quantity: true,
			},
			{
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
			}
		);

		if (!lineItem) return null;

		const enrichedItem = await attachProductToLineItem({ lineItem });
		return enrichedItem;
	} catch (err) {
		logEvent({
			fn: "addCartLineItem",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

/**
 *
 */
const updateCartItemQuantity = async ({
	lineItemId,
	quantity,
}: {
	lineItemId: string;
	quantity: number;
}): Promise<OperationResult<undefined, "NOT_FOUND" | "FAILURE">> => {
	const clClient = await getCommerceLayerClient();

	try {
		await clClient.line_items.update({
			id: lineItemId,
			quantity,
		});
		return { ok: true };
	} catch (err) {
		if (isCLApiError(err)) {
			if (err.status === 404 || err.message === "Not Found") {
				return { ok: false, reason: "NOT_FOUND" };
			}
		}

		logEvent({ fn: "removeCartItem", level: "error", event: "fail", error: err });
		return { ok: false, reason: "FAILURE" };
	}
};

/**
 *
 */
const removeCartItem = async ({
	lineItemId,
}: {
	lineItemId: string;
}): Promise<OperationResult<undefined, "NOT_FOUND" | "FAILURE">> => {
	const clClient = await getCommerceLayerClient();

	try {
		await clClient.line_items.delete(lineItemId);
		return { ok: true };
	} catch (err) {
		if (isCLApiError(err)) {
			if (err.status === 404 || err.message === "Not Found") {
				return { ok: false, reason: "NOT_FOUND" };
			}
		}

		logEvent({ fn: "removeCartItem", level: "error", event: "fail", error: err });
		return { ok: false, reason: "FAILURE" };
	}
};

export {
	createCart,
	deleteCart,
	attachCartToUser,
	addCartItem,
	updateCartItemQuantity,
	removeCartItem,
};
