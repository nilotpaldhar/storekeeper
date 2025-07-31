import type { Sku } from "@/types/sanity.types";

import { type NextRequest, NextResponse } from "next/server";

import { getCommerceLayerClient } from "@/lib/clients/commerce";
import { getSanityClient } from "@/lib/clients/sanity";
import { config as sanityConfig } from "@/lib/config/sanity";
import { SyncCommerceLayerSkusSchema } from "@/lib/schemas";

/**
 * Handler function for syncing SKUs from Commerce Layer into Sanity.
 *
 * @returns A JSON response indicating success or failure.
 */
export async function POST(req: NextRequest) {
	// Initialize Sanity and Commerce Layer clients
	const sanityClient = getSanityClient({ useToken: true });
	const clClient = await getCommerceLayerClient();

	// Parse and validate request body
	const body = await req.json();
	const validatedFields = SyncCommerceLayerSkusSchema.safeParse(body);

	// Check for valid secret
	if (!validatedFields.success || sanityConfig.skuSyncSecret !== validatedFields.data.secret) {
		return NextResponse.json(
			{
				success: false,
				message: `Unauthorized: secret token is invalid or missing.`,
			},
			{ status: 401 }
		);
	}

	try {
		// Begin a Sanity transaction
		let sanityTransaction = sanityClient.transaction();

		// Fetch all SKUs from Commerce Layer
		const skus = await clClient.skus.list();

		// Prepare SKUs to be created in Sanity (if not already existing)
		for (const sku of skus) {
			sanityTransaction = sanityTransaction.createIfNotExists<Sku>({
				_id: sku.id,
				_type: "sku",
				code: sku.code,
				name: sku.name ?? "",
				description: sku.description ?? "",
				imageUrl: sku.image_url ?? "",
				piecesPerPack: sku.pieces_per_pack ?? undefined,
				weight: sku.weight ?? undefined,
				unitOfWeight: sku.unit_of_weight ?? "",
				hsTariffNumber: sku.hs_tariff_number ?? "",
				_createdAt: new Date().toISOString(),
				_updatedAt: new Date().toISOString(),
				_rev: "",
			});
		}

		// Commit the transaction to Sanity
		await sanityTransaction.commit();

		return NextResponse.json({
			success: true,
			message: "SKUs have been synced from Commerce Layer into Sanity.",
		});
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: "Failed to sync SKUs from Commerce Layer to Sanity.",
			},
			{ status: 500 }
		);
	}
}
