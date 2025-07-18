import { NextRequest, NextResponse } from "next/server";

import { attachCustomerToOrder } from "@/lib/resources/orders/mutations";
import { AttachCustomerToOrderSchema } from "@/lib/schemas";

type Params = Promise<{ orderId: string }>;

/**
 * Handler function to attaches a customer to an existing order using their email address.
 *
 * @returns A JSON response with success, status and message.
 */
export async function PATCH(req: NextRequest, segmentData: { params: Params }) {
	const orderId = (await segmentData.params).orderId;

	// Parse and validate request body
	const body = await req.json();
	const validatedFields = AttachCustomerToOrderSchema.safeParse(body);

	if (!validatedFields.success) {
		return NextResponse.json(
			{ success: false, message: "Invalid customer data. Please check required fields." },
			{ status: 400 }
		);
	}

	// Attempt to attach the customer to the order
	const result = await attachCustomerToOrder({
		orderId,
		email: validatedFields.data.email,
	});

	// Handle known failure cases
	if (!result.ok && result.reason === "ORDER_NOT_FOUND") {
		return NextResponse.json(
			{ success: false, message: `Order not found. Please check the order ID.` },
			{ status: 404 }
		);
	}

	if (!result.ok && result.reason === "FAILURE") {
		return NextResponse.json(
			{ success: false, message: "Failed to attach customer to the order. Try again later." },
			{ status: 500 }
		);
	}

	return NextResponse.json(
		{
			success: true,
			message: `Customer successfully attached to the order.`,
		},
		{ status: 200 }
	);
}
