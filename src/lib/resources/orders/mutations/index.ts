import "server-only";

import type { OperationResult } from "@/types/domain.types";

import { z } from "zod";

import { getCommerceLayerClient } from "@/lib/clients/commerce";
import { logEvent } from "@/lib/logging/log-event";
import { AttachCustomerToOrderSchema } from "@/lib/schemas";
import { isCLApiError } from "@/lib/utils/commerce/errors";

/**
 *
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
 *
 */
const updateOrderAddresses = async () => {};

/**
 *
 */
const updateOrderShippingMethod = async () => {};

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
