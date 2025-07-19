import { NextRequest, NextResponse } from "next/server";

import { updateOrderAddresses } from "@/lib/resources/orders/mutations";
import { UpdateOrderAddressesSchema } from "@/lib/schemas";

type Params = Promise<{ orderId: string }>;

/**
 * Handler function to attaches a address to an existing order using address ID.
 *
 * @returns A JSON response with success, status and message.
 */
export async function PATCH(req: NextRequest, segmentData: { params: Params }) {
	const orderId = (await segmentData.params).orderId;

	// Parse and validate request body
	const body = await req.json();
	const validatedFields = UpdateOrderAddressesSchema.safeParse(body);

	if (!validatedFields.success) {
		return NextResponse.json(
			{
				success: false,
				message: "Invalid address data. Please check required fields.",
				errors: validatedFields.error.flatten().fieldErrors,
			},
			{ status: 400 }
		);
	}

	// Attempt to attach the address to the order
	const result = await updateOrderAddresses({
		orderId,
		...validatedFields.data,
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
			{ success: false, message: "Failed to attach address to the order. Try again later." },
			{ status: 500 }
		);
	}

	return NextResponse.json(
		{
			success: true,
			message: `Address successfully attached to the order.`,
		},
		{ status: 200 }
	);
}

// oelumynlae
