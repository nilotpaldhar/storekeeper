import type { Sku as SanitySku } from "@/types/sanity.types";
import type { ProductSeed } from "@seed/types";

import { getCommerceLayerClient } from "@/lib/clients/commerce";
import { getSanityClient } from "@/lib/clients/sanity";
import { config as clConfig } from "@/lib/config/commerce";

type Params = {
	sku: ProductSeed["sku"];
	inventory: ProductSeed["inventory"];
	pricing: ProductSeed["pricing"];
	shippingCategoryId: string;
};

/**
 * Creates a new SKU in Commerce Layer, including:
 * - SKU record with basic details.
 * - Optional inventory entry in the default stock location.
 * - Optional pricing in the default price list.
 */
const createClSku = async ({ sku, inventory, pricing, shippingCategoryId }: Params) => {
	const clClient = await getCommerceLayerClient();

	const clSku = await clClient.skus.create({
		code: sku.code,
		name: sku.name,
		weight: sku.weight,
		hs_tariff_number: sku.hs_tariff_number,
		unit_of_weight: "gr",
		pieces_per_pack: 1,
		image_url: null,
		do_not_ship: false,
		do_not_track: false,
		shipping_category: {
			type: "shipping_categories",
			id: shippingCategoryId,
		},
	});

	// Inventory creation
	try {
		const stockLocation = (
			await clClient.stock_locations.list({
				filters: { code_eq: clConfig.stockLocationCode },
			})
		).at(0);

		if (stockLocation) {
			await clClient.stock_items.create({
				sku: { type: "skus", id: clSku.id },
				quantity: inventory,
				stock_location: { type: "stock_locations", id: stockLocation.id },
			});
		} else {
			console.warn(`No stock location found for SKU: ${sku.code}`);
		}
	} catch (err) {
		console.error(`Inventory creation failed for SKU: ${sku.code}`, err);
	}

	// Pricing creation
	try {
		const priceList = (
			await clClient.price_lists.list({
				filters: { currency_code_eq: clConfig.currencyCode },
			})
		).at(0);

		if (priceList) {
			await clClient.prices.create({
				sku: { type: "skus", id: clSku.id },
				price_list: { type: "price_lists", id: priceList.id },
				amount_cents: pricing.discountedPrice * 100,
				compare_at_amount_cents: pricing.originalPrice * 100,
			});
		} else {
			console.warn(`No price list found for SKU: ${sku.code}`);
		}
	} catch (err) {
		console.error(`Price creation failed for SKU: ${sku.code}`, err);
	}

	return clSku;
};

/**
 * Ensures a SKU exists in both Commerce Layer and Sanity.
 * - If SKU exists in CL and Sanity, returns the Sanity SKU.
 * - If SKU exists in CL but not in Sanity, creates it in Sanity.
 * - If SKU does not exist in CL, creates it in CL (and Sanity).
 */
const findOrCreateSku = async (params: Params) => {
	const clClient = await getCommerceLayerClient();
	const sanityClient = getSanityClient({ useToken: true });
	const { sku } = params;

	try {
		// Check in Commerce Layer
		const existingClSku = (await clClient.skus.list({ filters: { code_eq: sku.code } })).at(0);

		if (existingClSku) {
			// Check in Sanity
			const existingSanitySku = await sanityClient.fetch<SanitySku | null>(
				`*[_type == "sku" && code == $code][0]`,
				{ code: sku.code }
			);
			if (existingSanitySku) return existingSanitySku;
		}

		// Create if missing
		const clSku = existingClSku ?? (await createClSku(params));

		const sanitySku = await sanityClient.createIfNotExists<SanitySku>({
			_id: clSku.id, // Use CL ID as Sanity _id
			_type: "sku",
			_rev: "",
			code: clSku.code,
			name: clSku.name ?? "",
			description: clSku.description ?? "",
			imageUrl: clSku.image_url ?? "",
			piecesPerPack: clSku.pieces_per_pack ?? undefined,
			weight: clSku.weight ?? undefined,
			unitOfWeight: clSku.unit_of_weight ?? "",
			hsTariffNumber: clSku.hs_tariff_number ?? "",
			_createdAt: new Date().toISOString(),
			_updatedAt: new Date().toISOString(),
		});

		return sanitySku;
	} catch (error) {
		console.error(`❌ Error in findOrCreateSku for code: ${sku.code}`, error);
		return null;
	}
};

export { findOrCreateSku };
