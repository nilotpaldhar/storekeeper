/**
 * User query keys
 *
 * Contains keys used to uniquely identify queries related to user data.
 */
export const userKeys = {
	current: ["current_user"] as const,
};

/**
 * Product price query keys
 *
 * Contains keys used to uniquely identify queries related to product pricing.
 */
export const productPriceKeys = {
	all: ["product-prices"] as const,
	bySku: (skuId: string) => [...productPriceKeys.all, "by-sku", skuId] as const,
};

/**
 * Product inventory query keys
 *
 * Contains keys used to uniquely identify queries related to product inventory.
 */
export const productInventoryKeys = {
	all: ["product-inventory"] as const,
	bySku: (skuId: string) => [...productInventoryKeys.all, "by-sku", skuId] as const,
};
