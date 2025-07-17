import type { OrderLineItem, OrderStatus } from "@/types/domain.types";

import { ORDER_AND_CART_LINE_ITEM_FIELDS } from "@/constants/commerce";

import { getCommerceLayerClient } from "@/lib/clients/commerce";
import { logEvent } from "@/lib/logging/log-event";
import { attachProductToLineItem } from "@/lib/resources/cart/services";

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

export { getOrder, getOrderLineItems };
