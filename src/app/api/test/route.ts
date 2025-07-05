import { NextResponse } from "next/server";
import { getDefaultStockLocation, getProductInventory } from "@/lib/resources/product/fetch";

export async function GET() {
	const skuId = "ByyEG";
	const defaultStockLocation = await getDefaultStockLocation();

	if (!defaultStockLocation) {
		return NextResponse.json({
			error: true,
			message: "Default stock location not found",
		});
	}

	const inventory = await getProductInventory({ skuId, stockLocationId: defaultStockLocation.id });

	if (!inventory) {
		return NextResponse.json({
			error: true,
			message: "Cant get inventory details",
		});
	}

	return NextResponse.json({
		success: true,
		data: inventory,
	});
}

/**
 * ByyESNRVvG
 * WKjRSYQNyk
 * WJoqSALPed
 * WaDeSPxYdj
 * BALKSzaeVV
 * ZyyESNRVar
 * nKjRSYQNeG
 * nJoqSALPOR
 * naDeSPxYmD
 */

/**
 * eMvmEuWwok
 * India Distribution Center
 * IN-DIST-CENTER
 *
 * qkPbeuBvEn
 * US Central Warehouse
 * US-CENTRAL-WH
 */
