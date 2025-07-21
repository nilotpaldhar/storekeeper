import "server-only";

import type { HomePage, PromoBlock } from "@/types/domain.types";
import type { HomePageQueryResult } from "@/types/sanity.types";

import { getImageUrl } from "@/lib/utils/sanity/get-image-url";

/**
 * Normalize a raw ...
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
				contentAlignment: item.contentAlignment ? item.contentAlignment : "right",
				thumbnail: {
					src: item.thumbnail?.image ? getImageUrl(item.thumbnail.image).url() : null,
					alt: item.thumbnail?.altText ?? null,
				},
				backdrop: item.backdrop
					? {
							src: item.backdrop?.image ? getImageUrl(item.backdrop.image).url() : null,
							alt: item.backdrop?.altText ?? null,
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
								type: item.link.resource.type ? item.link.resource.type : null,
								slug: item.link.resource.slug,
							}
						: null,
				},
			}))
		: [];

	return {
		id: rawHomePage.id,
		title: rawHomePage.title ?? "",
		promoSection: {
			hidden: promoSection?.hidden ?? false,
			items: promoBlocks,
		},
	};
};

export { normalizeHomePage };
