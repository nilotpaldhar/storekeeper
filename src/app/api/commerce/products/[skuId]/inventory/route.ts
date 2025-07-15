import { NextResponse, type NextRequest } from "next/server";

import { getProductInventory } from "@/lib/resources/products/fetch";
import { getDefaultStockLocation } from "@/lib/resources/stock-locations/fetch";

type Params = Promise<{ skuId: string }>;

/**
 * GET handler for retrieving a product inventory by SKU ID.
 *
 * @returns A JSON response with success status, message, and data (if available).
 */
export async function GET(req: NextRequest, segmentData: { params: Params }) {
	const params = await segmentData.params;
	const defaultStockLocation = await getDefaultStockLocation();

	if (!defaultStockLocation) {
		return NextResponse.json(
			{
				success: false,
				message: "Default stock location is not configured.",
			},
			{ status: 500 }
		);
	}

	const inventory = await getProductInventory({
		skuId: params.skuId,
		stockLocationId: defaultStockLocation.id,
	});

	if (!inventory) {
		return NextResponse.json(
			{
				success: false,
				message: `No inventory found for SKU ID: ${params.skuId} at the default stock location.`,
			},
			{ status: 404 }
		);
	}

	return NextResponse.json({
		success: true,
		message: "Inventory retrieved successfully.",
		data: inventory,
	});
}
