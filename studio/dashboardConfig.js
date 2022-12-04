export default {
	widgets: [
		{
			name: 'document-list',
			options: {
				title: 'Recently edited',
				order: '_updatedAt desc',
				limit: 10,
				types: ['homepage', 'shoppage', 'page', 'errorpage'],
			},
			layout: { width: 'auto', height: 'small' },
		},
		{
			name: 'project-users',
		},
		{
			name: 'project-info',
		},
	],
};
