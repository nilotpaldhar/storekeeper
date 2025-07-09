import type { APIResponse } from "@/types/api.types";
import type { ProductInventory, ProductPrice } from "@/types/domain.types";

import { axios, handleAxiosError } from "@/lib/http/client";

const getProductPrice = async ({ skuId }: { skuId: string }) => {
	try {
		const res = await axios.get<APIResponse<ProductPrice>>(`/commerce/products/${skuId}/price`);
		return res.data;
	} catch (error) {
		const errMsg = handleAxiosError(error);
		throw new Error(errMsg);
	}
};

const getProductInventory = async ({ skuId }: { skuId: string }) => {
	try {
		const res = await axios.get<APIResponse<ProductInventory>>(
			`/commerce/products/${skuId}/inventory`
		);
		return res.data;
	} catch (error) {
		const errMsg = handleAxiosError(error);
		throw new Error(errMsg);
	}
};

export { getProductPrice, getProductInventory };
