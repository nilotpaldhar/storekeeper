import type { OrderStatus } from "@/types/domain.types";

import { NextResponse, type NextRequest } from "next/server";

import { ORDER_AND_CART_SUMMARY_FIELDS } from "@/constants/commerce";
import { OrderResponseData } from "@/types/api.types";

import { getOrder, getOrderLineItems } from "@/lib/resources/orders/fetch";
import { isValidOrderStatus } from "@/lib/utils/commerce/is-valid-order-status";
import { pickFields } from "@/lib/utils/general/pick-fields";

type Params = Promise<{ orderId: string }>;

/**
 * GET handler for retrieving a specific order and its associated line items.
 *
 * @returns A JSON response indicating success or failure, with order summary and items if successful.
 */
export async function GET(req: NextRequest, segmentData: { params: Params }) {
	const orderId = (await segmentData.params).orderId;
	const searchParams = req.nextUrl.searchParams;

	// Extract and validate the optional `status` query parameter
	const statusParam = searchParams.get("status");
	const status: OrderStatus | undefined = isValidOrderStatus(statusParam) ? statusParam : undefined;

	// Fetch the order using its ID and optional status filter
	const order = await getOrder({ id: orderId, status });

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
	const data: OrderResponseData = {
		summary: {
			id: order.id,
			type: order.type,
			...pickFields(order, ORDER_AND_CART_SUMMARY_FIELDS),
		},
		items,
	};

	return NextResponse.json({
		success: true,
		message: "Order retrieved successfully.",
		data: data,
	});
}
