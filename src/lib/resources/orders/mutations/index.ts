import "server-only";

import type { OperationResult } from "@/types/domain.types";
import type { OrderUpdate } from "@commercelayer/sdk";

import { z } from "zod";

import { getCommerceLayerClient } from "@/lib/clients/commerce";
import { logEvent } from "@/lib/logging/log-event";
import {
	AttachCustomerToOrderSchema,
	UpdateOrderAddressesSchema,
	UpdateOrderShippingMethodSchema,
} from "@/lib/schemas";
import { isCLApiError } from "@/lib/utils/commerce/errors";

/**
 * Updates customer on an existing order in Commerce Layer.
 */
const attachCustomerToOrder = async ({
	orderId,
	email,
}: {
	orderId: string;
} & z.infer<typeof AttachCustomerToOrderSchema>): Promise<
	OperationResult<undefined, "ORDER_NOT_FOUND" | "FAILURE">
> => {
	const clClient = await getCommerceLayerClient();

	try {
		await clClient.orders.update({
			id: orderId,
			customer_email: email,
		});
		return { ok: true };
	} catch (err) {
		if (isCLApiError(err)) {
			if (err.status === 404) {
				return { ok: false, reason: "ORDER_NOT_FOUND" };
			}
		}

		logEvent({ fn: "attachCustomerToOrder", level: "error", event: "fail", error: err });
		return { ok: false, reason: "FAILURE" };
	}
};

/**
 * Updates either the shipping or billing address on an existing order in Commerce Layer.
 */
const updateOrderAddresses = async ({
	orderId,
	addressId,
	addressType,
	shippingAddressSameAsBilling,
}: {
	orderId: string;
} & z.infer<typeof UpdateOrderAddressesSchema>): Promise<
	OperationResult<undefined, "ORDER_NOT_FOUND" | "FAILURE">
> => {
	const clClient = await getCommerceLayerClient();

	// Initialize update payload with order ID
	const updatePayload: OrderUpdate = { id: orderId };

	// Prepare the payload based on address type
	if (addressType === "shipping") {
		// Case: Update shipping address
		updatePayload.shipping_address = { id: addressId, type: "addresses" };

		// If same as billing, set billing address too
		if (shippingAddressSameAsBilling) {
			updatePayload.billing_address = { id: addressId, type: "addresses" };
		}
	} else if (addressType === "billing") {
		// Case: Update billing address
		updatePayload.billing_address = { id: addressId, type: "addresses" };

		// If same as shipping, set shipping address too
		if (shippingAddressSameAsBilling) {
			updatePayload.shipping_address = { id: addressId, type: "addresses" };
		}
	}

	// Attempt to update the order in Commerce Layer
	try {
		await clClient.orders.update(updatePayload);
		return { ok: true };
	} catch (err) {
		if (isCLApiError(err)) {
			if (err.status === 404) {
				return { ok: false, reason: "ORDER_NOT_FOUND" };
			}
		}

		logEvent({ fn: "attachCustomerToOrder", level: "error", event: "fail", error: err });
		return { ok: false, reason: "FAILURE" };
	}
};

/**
 *
 */
const updateOrderShippingMethod = async ({
	orderId,
	shippingMethodId,
}: {
	orderId: string;
} & z.infer<typeof UpdateOrderShippingMethodSchema>): Promise<
	OperationResult<
		undefined,
		"ORDER_NOT_FOUND" | "SHIPMENT_NOT_FOUND" | "INVALID_SHIPPING_METHOD_ID" | "FAILURE"
	>
> => {
	const clClient = await getCommerceLayerClient();

	try {
		const order = await clClient.orders.retrieve(orderId, {
			include: ["shipments"],
			fields: ["shipments"],
		});

		const shipmentId = order.shipments?.at(0)?.id;
		if (!shipmentId) return { ok: false, reason: "SHIPMENT_NOT_FOUND" };

		await clClient.shipments.update({
			id: shipmentId,
			shipping_method: { id: shippingMethodId, type: "shipping_methods" },
		});

		return { ok: true };
	} catch (err) {
		if (isCLApiError(err)) {
			if (err.status === 404) {
				return { ok: false, reason: "ORDER_NOT_FOUND" };
			}

			if (err.status === 422) {
				return { ok: false, reason: "INVALID_SHIPPING_METHOD_ID" };
			}
		}

		logEvent({ fn: "updateOrderShippingMethod", level: "error", event: "fail", error: err });
		return { ok: false, reason: "FAILURE" };
	}
};

/**
 *
 */
const updateOrderPaymentMethod = async () => {};

/**
 *
 */
const placeOrder = async () => {};

export {
	attachCustomerToOrder,
	updateOrderAddresses,
	updateOrderShippingMethod,
	updateOrderPaymentMethod,
	placeOrder,
};
