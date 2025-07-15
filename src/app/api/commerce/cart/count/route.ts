import { NextResponse } from "next/server";

import { getOrCreateCart } from "@/lib/resources/cart/services";
import { getCurrentUser } from "@/lib/resources/user/services";

/**
 * Handler function to resolve and return the current cart count.
 *
 * @returns A JSON response with success status, message, and cart count data.
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

	return NextResponse.json({
		success: true,
		message: "Cart retrieved successfully.",
		data: { skus_count: cart.skus_count },
	});
}
