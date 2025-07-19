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
	bySku: (skuId: string) => [...productPriceKeys.all, "by_sku", skuId] as const,
};

/**
 * Product inventory query keys
 *
 * Contains keys used to uniquely identify queries related to product inventory.
 */
export const productInventoryKeys = {
	all: ["product-inventory"] as const,
	bySku: (skuId: string) => [...productInventoryKeys.all, "by_sku", skuId] as const,
};

/**
 * Cart query keys
 *
 * Contains keys used to uniquely identify queries related to cart.
 */
export const cartKeys = {
	base: ["cart"] as const,
	count: () => [...cartKeys.base, "count"] as const,
	summary: () => [...cartKeys.base, "summary"] as const,
	items: () => [...cartKeys.base, "items"] as const,
};

/**
 * Cart query keys
 *
 * Contains keys used to uniquely identify queries related to cart.
 */
export const orderKeys = {
	base: ["orders"] as const,
	byId: (id: string) => [...orderKeys.base, "by_id", id] as const,
	shippingMethods: (id: string) => [...orderKeys.base, "shipping_methods", id] as const,
};
