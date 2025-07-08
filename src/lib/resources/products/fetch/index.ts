import "server-only";
import type { ProductPrice } from "@/types/domain.types";

import { getCommerceLayerClient } from "@/lib/clients/commerce";
import { getSanityClient } from "@/lib/clients/sanity";
import { config as clConfig } from "@/lib/config/commerce";
import { logEvent } from "@/lib/logging/log-event";
import { ProductQuery, ProductSlugsQuery, RelatedProductsQuery } from "@/lib/queries/sanity";

/**
 * Fetches the default stock location from Commerce Layer.
 */
const getDefaultStockLocation = async () => {
	const clClient = await getCommerceLayerClient();

	try {
		const locations = await clClient.stock_locations.list({
			filters: { code_eq: clConfig.stockLocationCode },
		});

		return locations.at(0) ?? null;
	} catch (err) {
		logEvent({
			fn: "getDefaultStockLocation",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

/**
 * Fetches a list of product slugs from Sanity.
 */
const getProductSlugs = async ({ limit = 10 }: { limit?: number } = {}) => {
	try {
		const slugs = await getSanityClient().fetch(ProductSlugsQuery, { limit });
		if (!slugs || !Array.isArray(slugs)) return null;
		return slugs.map(({ slug }) => slug);
	} catch (err) {
		logEvent({
			fn: "getProductSlugs",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

/**
 * Fetches a product document from Sanity based on its slug.
 */
const getProductBySlug = async ({ slug }: { slug: string }) => {
	try {
		const product = await getSanityClient().fetch(ProductQuery, { slug });
		if (!product) return null;
		return product;
	} catch (err) {
		logEvent({
			fn: "getProductBySlug",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

/**
 *
 */
const getRelatedProducts = async ({ productId }: { productId: string }) => {
	try {
		const products = await getSanityClient().fetch(RelatedProductsQuery, { id: productId });
		if (!products?.relatedProducts) return [];
		return products.relatedProducts;
	} catch (err) {
		logEvent({
			fn: "getRelatedProducts",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

/**
 * Fetches the price for a given SKU ID, filtered by the configured currency code.
 */
const getProductPrice = async ({ skuId }: { skuId: string }): Promise<ProductPrice | null> => {
	const clClient = await getCommerceLayerClient();

	try {
		const prices = await clClient.skus.prices(skuId);
		const price = prices.filter((p) => p.currency_code === clConfig.currencyCode).at(0);
		return price ?? null;
	} catch (err) {
		logEvent({
			fn: "getProductPrice",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

/**
 * Fetches the stock inventory record for a given product SKU at a specific stock location.
 */
const getProductInventory = async ({
	skuId,
	stockLocationId,
}: {
	skuId: string;
	stockLocationId: string;
}) => {
	const clClient = await getCommerceLayerClient();

	try {
		const stockItems = await clClient.stock_items.list({
			filters: {
				sku_id_eq: skuId,
				stock_location_id_eq: stockLocationId,
			},
		});

		return stockItems.at(0) ?? null;
	} catch (err) {
		logEvent({
			fn: "getProductInventory",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

export {
	getDefaultStockLocation,
	getProductSlugs,
	getProductBySlug,
	getRelatedProducts,
	getProductPrice,
	getProductInventory,
};
