import { NextRequest, NextResponse } from "next/server";

import { resetCart } from "@/lib/resources/cart/services/get-or-create-cart";
import { placeOrder } from "@/lib/resources/orders/mutations";
import { getCurrentUser } from "@/lib/resources/user/services";

type Params = Promise<{ orderId: string }>;

/**
 * Handler function to place an order if it meets all required conditions:
 *
 * @returns A JSON response indicating success or the specific failure reason.
 */
export async function POST(req: NextRequest, segmentData: { params: Params }) {
	const orderId = (await segmentData.params).orderId;

	// Attempt to place the order
	const result = await placeOrder({ orderId });

	// Handle known failure reasons with appropriate status codes and messages
	if (!result.ok) {
		if (result.reason === "ORDER_NOT_FOUND") {
			return NextResponse.json(
				{ success: false, message: `Order not found with ID: ${orderId}` },
				{ status: 404 }
			);
		}

		if (result.reason === "ORDER_NOT_IN_PENDING_STATE") {
			return NextResponse.json(
				{
					success: false,
					message:
						"The order is not in a pending state and cannot be placed. Please ensure the order is ready for placement.",
				},
				{ status: 409 }
			);
		}

		if (result.reason === "ORDER_CUSTOMER_MISSING") {
			return NextResponse.json(
				{
					success: false,
					message:
						"The order has no associated customer. Please assign a customer before placing the order.",
				},
				{ status: 422 }
			);
		}

		if (result.reason === "ORDER_ADDRESS_MISSING") {
			return NextResponse.json(
				{
					success: false,
					message:
						"The order is missing a shipping or billing address. Both are required to place the order.",
				},
				{ status: 422 }
			);
		}

		if (result.reason === "ORDER_PAYMENT_METHOD_INCOMPLETE") {
			return NextResponse.json(
				{
					success: false,
					message:
						"The payment method or payment source is incomplete or missing. Please ensure a valid payment setup is in place.",
				},
				{ status: 422 }
			);
		}

		if (result.reason === "FAILURE") {
			return NextResponse.json(
				{
					success: false,
					message:
						"An unexpected error occurred while placing the order. Please try again or contact support.",
				},
				{ status: 500 }
			);
		}
	}

	// Reset the cart for the current user (clears existing cart and creates a new one)
	const user = await getCurrentUser();
	await resetCart({ user });

	return NextResponse.json(
		{
			success: true,
			message: `The order has been placed successfully.`,
		},
		{ status: 200 }
	);
}
