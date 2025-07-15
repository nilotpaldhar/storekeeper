import type { CartLineItem } from "@/types/domain.types";

import { getProductBySkuCode } from "@/lib/resources/products/fetch";
import { getImageUrl } from "@/lib/utils/sanity/get-image-url";

/**
 * Attach product data to a single cart line item.
 */
const attachProductToLineItem = async ({
	lineItem,
}: {
	lineItem: Omit<CartLineItem, "product">;
}): Promise<CartLineItem> => {
	const skuCode = lineItem.sku_code;

	if (!skuCode) {
		return { ...lineItem, product: null };
	}

	const productData = await getProductBySkuCode({ skuCode });

	if (!productData) {
		return { ...lineItem, product: null };
	}

	const thumbnailRaw = productData.gallery?.[0] ?? null;
	const thumbnail = thumbnailRaw
		? {
				src: thumbnailRaw.image ? getImageUrl(thumbnailRaw.image).url() : null,
				alt: thumbnailRaw.altText ?? "",
			}
		: null;

	return {
		...lineItem,
		product: {
			id: productData.id,
			title: productData.title ?? "",
			slug: productData.slug ?? "",
			thumbnail,
		},
	};
};

export { attachProductToLineItem };
