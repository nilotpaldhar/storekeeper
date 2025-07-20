import type { CartResponseData } from "@/types/api.types";

import { NextResponse } from "next/server";

import { ORDER_AND_CART_SUMMARY_FIELDS } from "@/constants/commerce";

import { getCartLineItems } from "@/lib/resources/cart/fetch";
import { getOrCreateCart } from "@/lib/resources/cart/services";
import { getCurrentUser } from "@/lib/resources/user/services";
import { pickFields } from "@/lib/utils/general/pick-fields";

/**
 * Handler function to resolve and return the current cart.
 *
 * @returns A JSON response with success status, message, and cart data.
 */
export async function GET() {
	const user = await getCurrentUser();
	const cart = await getOrCreateCart({ user });

	if (!cart) {
		return NextResponse.json(
			{
				success: false,
				message: "Failed to create or retrieve cart.",
			},
			{ status: 500 }
		);
	}

	const items = await getCartLineItems({ id: cart.id });
	const data: CartResponseData = {
		summary: {
			id: cart.id,
			type: cart.type,
			...pickFields(cart, ORDER_AND_CART_SUMMARY_FIELDS),
		},
		items,
	};

	return NextResponse.json({
		success: true,
		message: "Cart retrieved successfully.",
		data: data,
	});
}
