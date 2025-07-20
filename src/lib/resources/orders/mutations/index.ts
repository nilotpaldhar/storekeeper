import "server-only";

import type { OperationResult } from "@/types/domain.types";
import type { CommerceLayerClient, OrderUpdate } from "@commercelayer/sdk";

import { z } from "zod";

import { SUPPORTED_PAYMENT_SOURCE } from "@/constants/commerce";

import { getCommerceLayerClient } from "@/lib/clients/commerce";
import { logEvent } from "@/lib/logging/log-event";
import {
	AttachCustomerToOrderSchema,
	UpdateOrderAddressesSchema,
	UpdateOrderPaymentMethodSchema,
	UpdateOrderShippingMethodSchema,
} from "@/lib/schemas";
import { isCLApiError } from "@/lib/utils/commerce/errors";

type SupportedPaymentSource = (typeof SUPPORTED_PAYMENT_SOURCE)[number];

/**
 * A registry of payment source handlers based on supported `payment_source_type`s.
 *
 * Each handler is responsible for creating the appropriate payment source
 * on the Commerce Layer API, given a `clClient` and `orderId`.
 *
 * To add support for a new payment source:
 * 1. Add the new type to `SUPPORTED_PAYMENT_SOURCE`.
 * 2. Define a handler here using the same key.
 */
const PAYMENT_SOURCE_HANDLERS: Record<
	SupportedPaymentSource,
	({ clClient, orderId }: { clClient: CommerceLayerClient; orderId: string }) => Promise<void>
> = {
	wire_transfers: async ({ clClient, orderId }) => {
		await clClient.wire_transfers.create({
			order: { id: orderId, type: "orders" },
		});
	},
};

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
 * Updates the shipping method of a given order.
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
 * Updates the payment method of an order and creates the corresponding payment source.
 */
const updateOrderPaymentMethod = async ({
	orderId,
	paymentMethodId,
}: {
	orderId: string;
} & z.infer<typeof UpdateOrderPaymentMethodSchema>): Promise<
	OperationResult<
		undefined,
		"ORDER_NOT_FOUND" | "INVALID_PAYMENT_METHOD_ID" | "INVALID_PAYMENT_SOURCE_TYPE" | "FAILURE"
	>
> => {
	const clClient = await getCommerceLayerClient();

	try {
		// Update the order with the new payment method
		const order = await clClient.orders.update(
			{
				id: orderId,
				payment_method: { id: paymentMethodId, type: "payment_methods" },
			},
			{ include: ["payment_method"], fields: ["payment_method"] }
		);

		// Get the payment source type from the updated order
		const paymentSourceType = order.payment_method?.payment_source_type;

		// If no payment source type is returned, it's invalid
		if (!paymentSourceType) {
			return { ok: false, reason: "INVALID_PAYMENT_SOURCE_TYPE" };
		}

		// Look up the handler for the supported payment source type
		const handler = PAYMENT_SOURCE_HANDLERS[paymentSourceType as SupportedPaymentSource];

		// If no handler is found, the payment source type is not yet supported
		if (!handler) {
			return { ok: false, reason: "INVALID_PAYMENT_SOURCE_TYPE" };
		}

		// Execute the handler to create the appropriate payment source
		await handler({ clClient, orderId });

		return { ok: true };
	} catch (err) {
		if (isCLApiError(err)) {
			if (err.status === 404) {
				return { ok: false, reason: "ORDER_NOT_FOUND" };
			}

			if (err.status === 422) {
				return { ok: false, reason: "INVALID_PAYMENT_METHOD_ID" };
			}
		}

		logEvent({ fn: "updateOrderPaymentMethod", level: "error", event: "fail", error: err });
		return { ok: false, reason: "FAILURE" };
	}
};

/**
 * Places an order by validating its readiness and triggering the `_place` action via Commerce Layer.
 */
const placeOrder = async ({
	orderId,
}: {
	orderId: string;
}): Promise<
	OperationResult<
		undefined,
		| "ORDER_NOT_FOUND"
		| "ORDER_NOT_IN_PENDING_STATE"
		| "ORDER_CUSTOMER_MISSING"
		| "ORDER_ADDRESS_MISSING"
		| "ORDER_PAYMENT_METHOD_INCOMPLETE"
		| "FAILURE"
	>
> => {
	const clClient = await getCommerceLayerClient();

	try {
		// Retrieve order with necessary relationships and fields
		const order = await clClient.orders.retrieve(orderId, {
			include: [
				"customer",
				"shipping_address",
				"billing_address",
				"payment_method",
				"payment_source",
			],
			fields: [
				"status",
				"customer",
				"shipping_address",
				"billing_address",
				"payment_method",
				"payment_source",
			],
		});

		const { status, customer, shipping_address, billing_address, payment_method, payment_source } =
			order;

		// Ensure order is in a 'pending' state
		if (status !== "pending") {
			return { ok: false, reason: "ORDER_NOT_IN_PENDING_STATE" };
		}

		// Ensure customer is assigned
		if (!customer) {
			return { ok: false, reason: "ORDER_CUSTOMER_MISSING" };
		}

		// Ensure both shipping and billing addresses exist
		if (!shipping_address || !billing_address) {
			return { ok: false, reason: "ORDER_ADDRESS_MISSING" };
		}

		// Ensure payment method and source are valid
		if (!payment_method || !payment_source) {
			return { ok: false, reason: "ORDER_PAYMENT_METHOD_INCOMPLETE" };
		}

		await clClient.orders.update({ id: order.id, _place: true });

		return { ok: true };
	} catch (err) {
		if (isCLApiError(err)) {
			if (err.status === 404) {
				return { ok: false, reason: "ORDER_NOT_FOUND" };
			}
		}

		logEvent({ fn: "placeOrder", level: "error", event: "fail", error: err });

		return { ok: false, reason: "FAILURE" };
	}
};

export {
	attachCustomerToOrder,
	updateOrderAddresses,
	updateOrderShippingMethod,
	updateOrderPaymentMethod,
	placeOrder,
};
