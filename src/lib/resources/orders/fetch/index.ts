import type { OperationResult, OrderLineItem, OrderStatus } from "@/types/domain.types";
import type { ShippingMethod } from "@commercelayer/sdk";

import { ORDER_AND_CART_LINE_ITEM_FIELDS } from "@/constants/commerce";

import { getCommerceLayerClient } from "@/lib/clients/commerce";
import { config as clConfig } from "@/lib/config/commerce";
import { logEvent } from "@/lib/logging/log-event";
import { attachProductToLineItem } from "@/lib/resources/cart/services";
import { isCLApiError } from "@/lib/utils/commerce/errors";

/**
 * Fetches a single order from Commerce Layer by its ID and optional status.
 */
const getOrder = async ({ id, status }: { id: string; status?: OrderStatus }) => {
	const clClient = await getCommerceLayerClient();

	try {
		const orders = await clClient.orders.list({
			filters: {
				id_eq: id,
				...(status && { status_eq: status }),
			},
		});
		return orders.at(0) ?? null;
	} catch (error) {
		return null;
	}
};

/**
 * Fetches and enriches the line items (type: "skus") for a given order.
 */
const getOrderLineItems = async ({
	id,
	status,
}: {
	id: string;
	status?: OrderStatus;
}): Promise<OrderLineItem[]> => {
	const clClient = await getCommerceLayerClient();

	try {
		// Fetch raw line items for the given order ID.
		const lineItems = await clClient.orders.line_items(id, {
			filters: { item_type_eq: "skus", ...(status && { status_eq: status }) },
			include: ["sku"],
			fields: ORDER_AND_CART_LINE_ITEM_FIELDS,
		});

		// Enrich each line item with product data.
		const enrichedItems = await Promise.all(
			lineItems.map((lineItem) => attachProductToLineItem({ lineItem }))
		);

		return enrichedItems;
	} catch (err) {
		logEvent({
			fn: "getOrderLineItems",
			level: "error",
			event: "fail",
			error: err,
		});
		return [];
	}
};

/**
 *
 */
const getOrderShippingMethods = async ({
	id,
}: {
	id: string;
}): Promise<
	OperationResult<ShippingMethod[], "ORDER_NOT_FOUND" | "SHIPMENT_NOT_FOUND" | "FAILURE">
> => {
	const clClient = await getCommerceLayerClient();

	try {
		const order = await clClient.orders.retrieve(id, {
			include: ["shipments"],
			fields: ["shipments"],
		});

		const shipmentId = order.shipments?.at(0)?.id;
		if (!shipmentId) return { ok: false, reason: "SHIPMENT_NOT_FOUND" };

		const shippingMethods = await clClient.shipments.available_shipping_methods(shipmentId);
		return { ok: true, data: shippingMethods };
	} catch (err) {
		logEvent({
			fn: "getOrderAvailableShippingMethods",
			level: "error",
			event: "fail",
			error: err,
		});

		if (isCLApiError(err)) return { ok: false, reason: "ORDER_NOT_FOUND" };
		return { ok: false, reason: "FAILURE" };
	}
};

export { getOrder, getOrderLineItems, getOrderShippingMethods };
