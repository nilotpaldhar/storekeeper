import { defineConfig } from 'sanity';

/** Plugins. */
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { dashboardTool } from '@sanity/dashboard';
import { noteField } from 'sanity-plugin-note-field';
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy';
import { colorInput } from '@sanity/color-input';

import schemas from './schemas/schema';
import deskStructure from './deskStructure';
import dashboardConfig from './dashboardConfig';
import resolveProductionUrl from './resolveProductionUrl';

export default defineConfig({
	title: 'storekeeper',
	projectId: process.env.SANITY_STUDIO_SANITY_PROJECT_ID,
	dataset: process.env.SANITY_STUDIO_DATASET,
	document: {
		productionUrl: resolveProductionUrl,
	},
	plugins: [
		dashboardTool(dashboardConfig),
		deskTool({ structure: deskStructure }),
		visionTool(),
		noteField(),
		vercelDeployTool(),
		colorInput(),
	],
	schema: {
		types: schemas,
	},
});
