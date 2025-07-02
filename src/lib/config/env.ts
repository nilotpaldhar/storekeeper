import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
	server: {
		NODE_ENV: z.enum(["development", "test", "production"]),

		SANITY_ACCESS_TOKEN: z.string(),
		SANITY_COMMERCE_SKU_SYNC_SECRET: z.string().optional(),

		COMMERCE_LAYER_CLIENT_ID: z.string(),
		COMMERCE_LAYER_CLIENT_SECRET: z.string(),
		COMMERCE_LAYER_ORGANIZATION: z.string(),

		DATABASE_URL: z.string(),

		AUTH_URL: z.string().optional(),
		AUTH_SECRET: z.string().optional(),

		AUTH_GOOGLE_ID: z.string().optional(),
		AUTH_GOOGLE_SECRET: z.string().optional(),

		AUTH_FACEBOOK_ID: z.string().optional(),
		AUTH_FACEBOOK_SECRET: z.string().optional(),

		EMAIL_PROVIDER_API_KEY: z.string().optional(),
		EMAIL_FROM: z.string().optional(),
	},
	client: {
		NEXT_PUBLIC_SITE_URL: z.string().url(),
		NEXT_PUBLIC_SITE_TITLE: z.string().optional(),

		NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
		NEXT_PUBLIC_SANITY_PROJECT_TITLE: z.string().optional(),
		NEXT_PUBLIC_SANITY_DATASET: z.enum(["development", "production"]),
		NEXT_PUBLIC_SANITY_API_VERSION: z.string().optional(),
		NEXT_PUBLIC_SANITY_PREVIEW_TOKEN: z.string().optional(),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,

		SANITY_ACCESS_TOKEN: process.env.SANITY_ACCESS_TOKEN,
		SANITY_COMMERCE_SKU_SYNC_SECRET: process.env.SANITY_COMMERCE_SKU_SYNC_SECRET,

		COMMERCE_LAYER_CLIENT_ID: process.env.COMMERCE_LAYER_CLIENT_ID,
		COMMERCE_LAYER_CLIENT_SECRET: process.env.COMMERCE_LAYER_CLIENT_SECRET,
		COMMERCE_LAYER_ORGANIZATION: process.env.COMMERCE_LAYER_ORGANIZATION,

		DATABASE_URL: process.env.DATABASE_URL,

		AUTH_URL: process.env.AUTH_URL,
		AUTH_SECRET: process.env.AUTH_SECRET,

		AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
		AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,

		AUTH_FACEBOOK_ID: process.env.AUTH_FACEBOOK_ID,
		AUTH_FACEBOOK_SECRET: process.env.AUTH_FACEBOOK_SECRET,

		EMAIL_PROVIDER_API_KEY: process.env.EMAIL_PROVIDER_API_KEY,
		EMAIL_FROM: process.env.EMAIL_FROM,

		NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
		NEXT_PUBLIC_SITE_TITLE: process.env.NEXT_PUBLIC_SITE_TITLE,

		NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
		NEXT_PUBLIC_SANITY_PROJECT_TITLE: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE,
		NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
		NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
		NEXT_PUBLIC_SANITY_PREVIEW_TOKEN: process.env.NEXT_PUBLIC_SANITY_PREVIEW_TOKEN,
	},
});

export { env };
