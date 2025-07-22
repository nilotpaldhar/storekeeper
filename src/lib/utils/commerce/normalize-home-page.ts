import "server-only";

import type { HomePage, PromoBlock } from "@/types/domain.types";
import type { HomePageQueryResult } from "@/types/sanity.types";

import { normalizeProductCollection } from "@/lib/utils/commerce/normalize-product-collection";
import { getImageUrl } from "@/lib/utils/sanity/get-image-url";

/**
 * Normalize a raw Sanity home page response into a structured `HomePage` object.
 */
const normalizeHomePage = async (
	rawHomePage: HomePageQueryResult | null | undefined
): Promise<HomePage | null> => {
	if (!rawHomePage) return null;

	const promoSection = rawHomePage.promoSection;

	const promoBlocks: PromoBlock[] = Array.isArray(promoSection?.items)
		? promoSection.items.map((item) => ({
				id: item.id,
				title: item.title ?? "",
				description: item.description ?? null,
				contentAlignment: item.contentAlignment ?? "right",
				thumbnail: {
					src: item.thumbnail?.image ? getImageUrl(item.thumbnail.image).url() : null,
					alt: item.thumbnail?.altText ?? null,
				},
				backdrop: item.backdrop
					? {
							src: item.backdrop.image ? getImageUrl(item.backdrop.image).url() : null,
							alt: item.backdrop.altText ?? null,
						}
					: null,
				price: {
					label: item.price?.label ?? "",
					amount: item.price?.amount ?? "",
				},
				link: {
					label: item.link?.label ?? "",
					resource: item.link?.resource
						? {
								type: item.link.resource.type ?? null,
								slug: item.link.resource.slug,
							}
						: null,
				},
			}))
		: [];

	const productSections: HomePage["productSections"] = Array.isArray(rawHomePage.productSections)
		? await Promise.all(
				rawHomePage.productSections.map(async (section) => ({
					refKey: section.key,
					title: section.title || "",
					hidden: !!section.hidden,
					products: Array.isArray(section.products)
						? await normalizeProductCollection(section.products)
						: [],
				}))
			)
		: [];

	return {
		id: rawHomePage.id,
		title: rawHomePage.title ?? "",
		promoSection: {
			hidden: promoSection?.hidden ?? false,
			items: promoBlocks,
		},
		productSections,
	};
};

export { normalizeHomePage };
