import { NextRequest, NextResponse } from "next/server";

import { getOrderShippingMethods } from "@/lib/resources/orders/fetch";
import { updateOrderShippingMethod } from "@/lib/resources/orders/mutations";
import { UpdateOrderShippingMethodSchema } from "@/lib/schemas";

type Params = Promise<{ orderId: string }>;

/**
 * Handler function to retrieve available shipping methods for a given order.
 *
 * @returns A JSON response with success status, message, and shipping methods data (if available).
 */
export async function GET(req: NextRequest, segmentData: { params: Params }) {
	const orderId = (await segmentData.params).orderId;

	// Fetch available shipping methods for the specified order
	const result = await getOrderShippingMethods({ id: orderId });

	// Handle various failure cases
	if (!result.ok) {
		if (result.reason === "ORDER_NOT_FOUND") {
			return NextResponse.json(
				{ success: false, message: `Order not found with ID: ${orderId}` },
				{ status: 404 }
			);
		}

		if (result.reason === "SHIPMENT_NOT_FOUND") {
			return NextResponse.json(
				{
					success: false,
					message: `Shipping and billing addresses must be added before retrieving shipping methods.`,
				},
				{ status: 409 }
			);
		}

		if (result.reason === "FAILURE") {
			return NextResponse.json(
				{
					success: false,
					message: `An internal error occurred while retrieving available shipping methods.`,
				},
				{ status: 500 }
			);
		}
	}

	return NextResponse.json(
		{
			success: true,
			message: `Available shipping methods retrieved successfully.`,
			data: result.ok ? result.data : undefined,
		},
		{ status: 200 }
	);
}

/**
 * Handler function to update the shipping method for a given order.
 *
 * @returns A JSON response indicating the outcome of the update.
 */
export async function PATCH(req: NextRequest, segmentData: { params: Params }) {
	const orderId = (await segmentData.params).orderId;

	// Parse and validate request body using Zod schema
	const body = await req.json();
	const validatedFields = UpdateOrderShippingMethodSchema.safeParse(body);

	// Return 400 Bad Request if validation fails
	if (!validatedFields.success) {
		return NextResponse.json(
			{ success: false, message: "Invalid shipping data. Please check required fields." },
			{ status: 400 }
		);
	}

	// Attempt to update the shipping method for the given order
	const result = await updateOrderShippingMethod({
		orderId,
		shippingMethodId: validatedFields.data.shippingMethodId,
	});

	// Handle possible failure reasons from update logic
	if (!result.ok) {
		if (result.reason === "ORDER_NOT_FOUND") {
			return NextResponse.json(
				{ success: false, message: `Order not found with ID: ${orderId}` },
				{ status: 404 }
			);
		}

		if (result.reason === "SHIPMENT_NOT_FOUND") {
			return NextResponse.json(
				{
					success: false,
					message: `Shipping and billing addresses must be added before retrieving shipping methods.`,
				},
				{ status: 409 }
			);
		}

		if (result.reason === "INVALID_SHIPPING_METHOD_ID") {
			return NextResponse.json(
				{
					success: false,
					message: `The provided shipping method ID is invalid or not applicable.`,
				},
				{ status: 409 }
			);
		}

		if (result.reason === "FAILURE") {
			return NextResponse.json(
				{
					success: false,
					message: `An unexpected error occurred while updating the shipping method.`,
				},
				{ status: 500 }
			);
		}
	}

	return NextResponse.json(
		{
			success: true,
			message: `Shipping method updated successfully.`,
		},
		{ status: 200 }
	);
}
