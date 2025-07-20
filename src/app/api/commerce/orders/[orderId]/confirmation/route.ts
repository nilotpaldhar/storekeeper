import { NextResponse, type NextRequest } from "next/server";

import { ORDER_AND_CART_SUMMARY_FIELDS } from "@/constants/commerce";
import { ConfirmedOrderResponseData } from "@/types/api.types";

import { getConfirmedOrder, getOrderLineItems } from "@/lib/resources/orders/fetch";
import { normalizeAddress } from "@/lib/utils/commerce/normalize-address";
import { pickFields } from "@/lib/utils/general/pick-fields";

type Params = Promise<{ orderId: string }>;

/**
 * GET handler for retrieving a confirmed order and its associated line items.
 *
 * @returns A JSON response indicating success or failure, with order summary and items if successful.
 */
export async function GET(req: NextRequest, segmentData: { params: Params }) {
	const orderId = (await segmentData.params).orderId;

	const order = await getConfirmedOrder({ id: orderId });

	// Return 500 if the order is not found or retrieval fails
	if (!order) {
		return NextResponse.json(
			{
				success: false,
				message: "Failed to retrieve order.",
			},
			{ status: 500 }
		);
	}

	// Fetch and enrich line items for the order
	const items = await getOrderLineItems({ id: order.id });

	// Construct structured response data
	const data: ConfirmedOrderResponseData = {
		summary: {
			id: order.id,
			type: order.type,
			...pickFields(order, ORDER_AND_CART_SUMMARY_FIELDS),
		},
		paymentMethod: order.payment_method,
		address: {
			billing: order.billing_address ? normalizeAddress(order.billing_address) : null,
			shipping: order.shipping_address ? normalizeAddress(order.shipping_address) : null,
		},
		items,
	};

	return NextResponse.json({
		success: true,
		message: "Order retrieved successfully.",
		data: data,
	});
}
