import { env } from "@/lib/config/env";

const config = {
	projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	projectTitle: env.NEXT_PUBLIC_SANITY_PROJECT_TITLE,
	dataset: env.NEXT_PUBLIC_SANITY_DATASET,
	apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-05-26",
	accessToken: env.SANITY_ACCESS_TOKEN,
	previewToken: env.NEXT_PUBLIC_SANITY_PREVIEW_TOKEN,
	skuSyncSecret: env.SANITY_COMMERCE_SKU_SYNC_SECRET,
};

export { config };
