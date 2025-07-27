import { type NextRequest, NextResponse } from "next/server";

import { ALGOLIA_INDEXES } from "@/constants/commerce";

import { adminAlgoliaClient } from "@/lib/clients/algolia";
import { getSanityClient } from "@/lib/clients/sanity";
import { config as algoliaConfig } from "@/lib/config/algolia";
import { SyncPublishedProductsQuery } from "@/lib/queries/sanity";
import { IndexProductsToAlgoliaSchema } from "@/lib/schemas";
import { normalizeProductCollection } from "@/lib/utils/commerce/normalize-product-collection";

/**
 * Handler function for syncing published products from Sanity to Algolia.
 *
 * @returns A JSON response indicating success or failure.
 */
export async function POST(req: NextRequest) {
	const body = await req.json();

	// Validate request body against expected schema
	const validatedFields = IndexProductsToAlgoliaSchema.safeParse(body);

	if (
		!validatedFields.success ||
		algoliaConfig.productsSyncSecret !== validatedFields.data.secret
	) {
		return NextResponse.json(
			{
				success: false,
				message: `Unauthorized: secret token is invalid or missing.`,
			},
			{ status: 401 }
		);
	}

	try {
		// Fetch published products from Sanity
		const rawProducts = await getSanityClient().fetch(SyncPublishedProductsQuery);

		// Normalize products
		const products = await normalizeProductCollection(rawProducts);

		// Initialize Algolia index
		const productIndex = adminAlgoliaClient.initIndex(ALGOLIA_INDEXES.PRODUCTS);

		// Push products to Algolia
		await productIndex.saveObjects(products.map((p) => ({ objectID: p.id, ...p })));

		return NextResponse.json({
			success: true,
			message: "Successfully synced products with algolia",
		});
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: "Failed to sync products from Sanity to Algolia.",
			},
			{ status: 500 }
		);
	}
}
