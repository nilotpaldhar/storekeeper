import { projectUsersWidget, projectInfoWidget } from '@sanity/dashboard';
import { documentListWidget } from 'sanity-plugin-dashboard-widget-document-list';

export default {
	widgets: [
		documentListWidget({
			title: 'Recently edited',
			order: '_updatedAt desc',
			types: ['homepage', 'page', 'errorpage'],
			limit: 10,
			layout: { width: 'auto', height: 'small' },
		}),
		projectUsersWidget(),
		projectInfoWidget(),
	],
};
