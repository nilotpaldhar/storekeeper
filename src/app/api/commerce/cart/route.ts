import type { CartResponseData } from "@/types/api.types";

import { NextResponse } from "next/server";

import { getCartLineItems } from "@/lib/resources/cart/fetch";
import { getOrCreateCart } from "@/lib/resources/cart/services";
import { getCurrentUser } from "@/lib/resources/user/services";

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
			formatted_discount_amount: cart.formatted_discount_amount,
			formatted_gift_card_amount: cart.formatted_gift_card_amount,
			formatted_shipping_amount: cart.formatted_shipping_amount,
			formatted_subtotal_amount: cart.formatted_subtotal_amount,
			formatted_total_amount_with_taxes: cart.formatted_total_amount_with_taxes,
			formatted_total_tax_amount: cart.formatted_total_tax_amount,
			number: cart.number,
			skus_count: cart.skus_count,
			coupon_code: cart.coupon_code,
		},
		items,
	};

	return NextResponse.json({
		success: true,
		message: "Cart retrieved successfully.",
		data: data,
	});
}
