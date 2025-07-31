"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { CustomNavbar } from "./src/components/sanity/custom-navbar";
import { env } from "./src/lib/config/env";
import { resolveProductionUrl } from "./src/sanity/helpers/resolve-production-url";
import { schema } from "./src/sanity/schemas";
import { structure } from "./src/sanity/structure";

export default defineConfig({
	basePath: "/studio",
	title: env.NEXT_PUBLIC_SANITY_PROJECT_TITLE,
	projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: env.NEXT_PUBLIC_SANITY_DATASET,
	schema,
	studio: {
		components: {
			navbar: CustomNavbar,
		},
	},
	plugins: [
		structureTool({ structure }),
		visionTool({
			defaultApiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
		}),
	],
	document: {
		productionUrl: resolveProductionUrl,
	},
});
