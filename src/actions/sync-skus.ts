"use server";

import type { Sku } from "@/types/sanity.types";

import { flattenValidationErrors } from "next-safe-action";
import { z } from "zod";

import { env } from "@/lib/env";
import { actionClient } from "@/lib/safe-action";

import { client as sanityClient } from "@/lib/sanity/client";
import { client as clClient } from "@/lib/commerce/client";

const schema = z.object({
	secret: z.string().min(1),
});

const syncSkusAction = actionClient
	.metadata({ actionName: "syncSkusAction" })
	.inputSchema(schema, {
		handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
	})
	.action(async ({ parsedInput: { secret } }) => {
		if (secret !== env.SANITY_COMMERCE_SKU_SYNC_SECRET) {
			throw new Error("Unauthorized! Access denied");
		}

		let sanityTransaction = sanityClient.transaction();
		const skus = await clClient.skus.list();
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
		await sanityTransaction.commit();

		return { message: `SKUs have been synced from Commerce Layer into Sanity.` };
	});

export { syncSkusAction };
