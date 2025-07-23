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
	const categorySection = rawHomePage.categorySection;
	const collectionSection = rawHomePage.collectionSection;

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

	const categories: HomePage["categorySection"]["items"] = Array.isArray(categorySection?.items)
		? categorySection.items.map((item) => ({
				id: item.id,
				title: item.title ?? "",
				slug: item.slug ?? "",
				thumbnail: {
					src: item.thumbnail?.image ? getImageUrl(item.thumbnail.image).url() : null,
					alt: item.thumbnail?.altText ?? null,
				},
			}))
		: [];

	const collections: HomePage["collectionSection"]["items"] = Array.isArray(
		collectionSection?.items
	)
		? collectionSection.items.map((item) => ({
				id: item.id,
				title: item.title ?? "",
				slug: item.slug ?? "",
				description: item.description ?? null,
				thumbnail: item.thumbnail
					? {
							src: item.thumbnail?.image ? getImageUrl(item.thumbnail.image).url() : null,
							alt: item.thumbnail?.altText ?? null,
						}
					: null,
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
		categorySection: {
			title: categorySection?.title ?? "",
			hidden: categorySection?.hidden ?? false,
			items: categories,
		},
		collectionSection: {
			hidden: collectionSection?.hidden ?? false,
			items: collections,
		},
		productSections,
	};
};

export { normalizeHomePage };
