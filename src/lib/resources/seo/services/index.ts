import "server-only";
import type { Metadata } from "next";

import { env } from "@/lib/config/env";
import { logEvent } from "@/lib/logging/log-event";
import { getGlobalSeo } from "@/lib/resources/seo/fetch";

type SeoOverrides = {
	metaTitle?: string | null;
	metaDesc?: string | null;
	shareTitle?: string | null;
	shareDesc?: string | null;
	shareGraphic?: string | null;
};

const getSeo = async (overrides: SeoOverrides = {}): Promise<Metadata> => {
	const fallBack = {
		title: env.NEXT_PUBLIC_SITE_TITLE,
		description: "",
	};

	try {
		const globalSeo = await getGlobalSeo();
		if (!globalSeo) return fallBack;

		const metaTitlePart = overrides.metaTitle?.trim();
		const globalTitlePart = globalSeo?.metaTitle?.trim();

		const metaTitle =
			metaTitlePart && globalTitlePart
				? `${metaTitlePart} | ${globalTitlePart}`
				: metaTitlePart || globalTitlePart || fallBack.title;

		const metaDescription = overrides.metaDesc || globalSeo?.metaDesc || "";

		const shareTitle = overrides.shareTitle || metaTitle;
		const shareDescription = overrides.shareDesc || globalSeo?.shareDesc || "";
		const shareGraphic = overrides.shareGraphic || globalSeo?.shareGraphic || "";

		return {
			title: metaTitle,
			description: metaDescription,
			robots: {
				index: !globalSeo?.metaRobotsNoindex,
				follow: !globalSeo?.metaRobotsNofollow,
			},
			icons: {
				icon: globalSeo?.favicon || "",
				shortcut: globalSeo?.faviconLegacy || "",
				apple: globalSeo?.touchIcon || "",
			},
			openGraph: {
				title: shareTitle,
				description: shareDescription,
				images: shareGraphic ? [{ url: shareGraphic }] : [],
			},
			twitter: {
				card: globalSeo?.twitterCardType || "summary_large_image",
				title: shareTitle,
				description: shareDescription,
				images: shareGraphic ? [shareGraphic] : [],
				site: globalSeo?.twitterUsername
					? `@${globalSeo.twitterUsername.replace(/^@/, "")}`
					: undefined,
			},
		};
	} catch (err) {
		logEvent({
			fn: "getSeo",
			level: "error",
			event: "fail",
			error: err,
		});
		return fallBack;
	}
};

export { getSeo };
