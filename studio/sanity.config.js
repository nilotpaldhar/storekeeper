import { defineConfig } from 'sanity';

/** Plugins. */
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { dashboardTool } from '@sanity/dashboard';
import { noteField } from 'sanity-plugin-note-field';
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy';

import schemas from './schemas/schema';
import deskStructure from './deskStructure';
import dashboardConfig from './dashboardConfig';
import resolveProductionUrl from './resolveProductionUrl';

export default defineConfig({
	title: 'storekeeper',
	projectId: 'becnbc49',
	dataset: 'production',
	document: {
		productionUrl: resolveProductionUrl,
	},
	plugins: [
		dashboardTool(dashboardConfig),
		deskTool({ structure: deskStructure }),
		visionTool(),
		noteField(),
		vercelDeployTool(),
	],
	schema: {
		types: schemas,
	},
});
