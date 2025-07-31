import type { APIResponse } from "@/types/api.types";

import { z } from "zod";

import { axios, handleAxiosError } from "@/lib/http/client";

import { IndexProductsToAlgoliaSchema, SyncCommerceLayerSkusSchema } from "../schemas";

const syncSkusFromCommerceLayer = async ({
	secret,
}: z.infer<typeof SyncCommerceLayerSkusSchema>) => {
	try {
		const res = await axios.post<APIResponse<undefined>>(`/admin/sync/commerce-layer/skus`, {
			secret,
		});
		return res.data;
	} catch (error) {
		const errMsg = handleAxiosError(error);
		throw new Error(errMsg);
	}
};

const indexProductsToAlgolia = async ({ secret }: z.infer<typeof IndexProductsToAlgoliaSchema>) => {
	try {
		const res = await axios.post<APIResponse<undefined>>(`/admin/sync/algolia/products`, {
			secret,
		});
		return res.data;
	} catch (error) {
		const errMsg = handleAxiosError(error);
		throw new Error(errMsg);
	}
};

export { syncSkusFromCommerceLayer, indexProductsToAlgolia };
