import { NextRequest, NextResponse } from "next/server";

import { removeCartItem, updateCartItemQuantity } from "@/lib/resources/cart/mutations";
import { UpdateCartItemQuantitySchema } from "@/lib/schemas";

type Params = Promise<{ itemId: string }>;

/**
 * Handler function to update a cart line item quantity by ID.
 *
 * @returns A JSON response with success status, and message.
 */
export async function PATCH(req: NextRequest, segmentData: { params: Params }) {
	const params = await segmentData.params;

	const body = await req.json();
	const validatedFields = UpdateCartItemQuantitySchema.safeParse(body);

	if (!validatedFields.success) {
		return NextResponse.json(
			{
				success: false,
				message: `Invalid request: cart item quantity must be at least 1.`,
			},
			{ status: 400 }
		);
	}

	const { itemId } = params;
	const { quantity } = validatedFields.data;

	const result = await updateCartItemQuantity({ lineItemId: itemId, quantity });

	if (!result.ok && result.reason === "NOT_FOUND") {
		return NextResponse.json(
			{ success: false, message: `Cart item '${itemId}' not found.` },
			{ status: 404 }
		);
	}

	if (!result.ok && result.reason === "FAILURE") {
		return NextResponse.json(
			{
				success: false,
				message: `Unable to update quantity for cart item '${itemId}'. Please try again later.`,
			},
			{ status: 500 }
		);
	}

	return NextResponse.json(
		{
			success: true,
			message: `Cart item '${itemId}' quantity updated successfully.`,
		},
		{ status: 200 }
	);
}

/**
 * Handler function to remove a cart line item by ID.
 *
 * @returns A JSON response with success status, and message.
 */
export async function DELETE(req: NextRequest, segmentData: { params: Params }) {
	const { itemId } = await segmentData.params;

	const result = await removeCartItem({ lineItemId: itemId });

	if (!result.ok && result.reason === "NOT_FOUND") {
		return NextResponse.json(
			{ success: false, message: `Cart item '${itemId}' not found.` },
			{ status: 404 }
		);
	}

	if (!result.ok && result.reason === "FAILURE") {
		return NextResponse.json(
			{
				success: false,
				message: `Unable to remove cart item '${itemId}'. Please try again later.`,
			},
			{ status: 500 }
		);
	}

	return NextResponse.json(
		{
			success: true,
			message: `Cart item '${itemId}' removed successfully.`,
		},
		{ status: 200 }
	);
}
