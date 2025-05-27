"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { dataset, projectId, apiVersion, projectTitle } from "./src/sanity/env";
import { schema } from "./src/sanity/schemas";
import { structure } from "./src/sanity/structure";

export default defineConfig({
	basePath: "/studio",
	title: projectTitle,
	projectId,
	dataset,
	schema,
	plugins: [
		structureTool({ structure }),
		visionTool({
			defaultApiVersion: apiVersion,
		}),
	],
});
