import { NextRequest, NextResponse } from "next/server";

import { addCartItem } from "@/lib/resources/cart/mutations";
import { getOrCreateCart } from "@/lib/resources/cart/services";
import { getCurrentUser } from "@/lib/resources/user/services";
import { AddCartItemSchema } from "@/lib/schemas";

/**
 * Handler function for adding an item to the cart.
 *
 * @returns A JSON response with success status, message, and the newly added cart line item (if successful).
 */
export async function POST(req: NextRequest) {
	// Parse and validate the request body against the schema
	const body = await req.json();
	const validatedFields = AddCartItemSchema.safeParse(body);

	// If validation fails, return a 400 Bad Request with an error message
	if (!validatedFields.success) {
		return NextResponse.json(
			{
				success: false,
				message: `Invalid request: cart item data did not pass validation.`,
			},
			{ status: 400 }
		);
	}

	const { skuCode, quantity } = validatedFields.data;
	const user = await getCurrentUser();
	const cart = await getOrCreateCart({ user });

	// If cart creation or retrieval fails, return a 500 error
	if (!cart) {
		return NextResponse.json(
			{
				success: false,
				message: "Failed to create or retrieve cart.",
			},
			{ status: 500 }
		);
	}

	// Add the new line item to the cart
	const newLineItem = await addCartItem({ cartId: cart.id, skuCode, quantity });

	// If adding the line item fails, return a 500 error
	if (!newLineItem) {
		return NextResponse.json(
			{
				success: false,
				message: "Failed to add item to cart. Please try again.",
			},
			{ status: 500 }
		);
	}

	return NextResponse.json({
		success: true,
		message: `Item added to cart successfully (SKU: ${newLineItem.sku_code}, Quantity: ${newLineItem.quantity}).`,
		data: newLineItem,
	});
}
