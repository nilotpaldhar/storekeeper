import { NextResponse, type NextRequest } from "next/server";

import { getProductPrice } from "@/lib/resources/products/fetch";

type Params = Promise<{ skuId: string }>;

/**
 * GET handler for retrieving a product price by SKU ID.
 *
 * @returns A JSON response with success status, message, and data (if available).
 */
export async function GET(req: NextRequest, segmentData: { params: Params }) {
	const params = await segmentData.params;
	const price = await getProductPrice({ skuId: params.skuId });

	if (!price) {
		return NextResponse.json(
			{
				success: false,
				message: "No price found for the given SKU and currency.",
			},
			{ status: 404 }
		);
	}

	return NextResponse.json({
		success: true,
		message: "Price retrieved successfully.",
		data: price,
	});
}
