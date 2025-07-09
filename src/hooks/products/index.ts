import { useQuery } from "@tanstack/react-query";

import { productInventoryKeys, productPriceKeys } from "@/constants/tanstack-query-keys";

import { getProductInventory, getProductPrice } from "@/lib/requests/products";

const useProductPrice = ({ skuId, enabled = true }: { skuId: string; enabled?: boolean }) => {
	return useQuery({
		queryKey: productPriceKeys.bySku(skuId),
		queryFn: () => getProductPrice({ skuId }),
		enabled,
	});
};

const useProductInventory = ({ skuId, enabled = true }: { skuId: string; enabled?: boolean }) => {
	return useQuery({
		queryKey: productInventoryKeys.bySku(skuId),
		queryFn: () => getProductInventory({ skuId }),
		enabled,
	});
};

export { useProductPrice, useProductInventory };
