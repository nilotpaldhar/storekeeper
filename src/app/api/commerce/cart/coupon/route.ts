import { NextRequest, NextResponse } from "next/server";

import { applyCouponToCart, removeCouponFromCart } from "@/lib/resources/cart/mutations";
import { getOrCreateCart } from "@/lib/resources/cart/services";
import { getCurrentUser } from "@/lib/resources/user/services";
import { AddCartCouponSchema } from "@/lib/schemas";

/**
 * Handler function for updating the current cart's coupon.
 *
 * @returns A JSON response with success status, and message.
 */
export async function POST(req: NextRequest) {
	const body = await req.json();
	const validatedFields = AddCartCouponSchema.safeParse(body);

	if (!validatedFields.success) {
		return NextResponse.json(
			{
				success: false,
				message: `Invalid request: coupon code is required.`,
			},
			{ status: 400 }
		);
	}

	const user = await getCurrentUser();
	const cart = await getOrCreateCart({ user });
	const { couponCode } = validatedFields.data;

	if (!cart) {
		return NextResponse.json(
			{
				success: false,
				message: "Failed to create or retrieve cart.",
			},
			{ status: 500 }
		);
	}

	const result = await applyCouponToCart({ cartId: cart?.id, couponCode });

	if (!result.ok && result.reason === "INVALID_COUPON_CODE") {
		return NextResponse.json({ success: false, message: `Invalid coupon code.` }, { status: 422 });
	}

	if (!result.ok && result.reason === "FAILURE") {
		return NextResponse.json(
			{ success: false, message: `Could not apply coupon.` },
			{ status: 500 }
		);
	}

	return NextResponse.json(
		{
			success: true,
			message: `Coupon applied successfully.`,
		},
		{ status: 200 }
	);
}

/**
 * Handler function for removing the coupon from the current cart.
 *
 * @returns A JSON response with success status, and message.
 */
export async function DELETE() {
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

	const result = await removeCouponFromCart({ cartId: cart.id });

	if (!result.ok && result.reason === "FAILURE") {
		return NextResponse.json(
			{ success: false, message: `Could not remove coupon.` },
			{ status: 500 }
		);
	}

	return NextResponse.json(
		{
			success: true,
			message: `Could not remove coupon.`,
		},
		{ status: 200 }
	);
}
