export default {
	title: 'Categories',
	name: 'category',
	type: 'document',
	fieldsets: [
		{
			title: 'Commerce',
			name: 'commerce',
			description: 'Category data synced from Chec/Commerce.js',
			readOnly: true,
			options: { collapsible: true, collapsed: false },
		},
	],
	fields: [
		{
			title: 'ID',
			name: 'categoryID',
			type: 'string',
			fieldset: 'commerce',
		},
		{
			title: 'Parent ID',
			name: 'parentID',
			type: 'string',
			fieldset: 'commerce',
		},
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			fieldset: 'commerce',
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'string',
			fieldset: 'commerce',
		},
		{
			title: 'Description',
			name: 'description',
			type: 'text',
			fieldset: 'commerce',
		},
		{
			title: 'Children',
			name: 'children',
			type: 'array',
			of: [
				{
					title: 'Child',
					type: 'object',
					fields: [
						{
							title: 'ID',
							name: 'id',
							type: 'string',
						},
						{
							title: 'Title',
							name: 'title',
							type: 'string',
						},
						{
							title: 'Slug',
							name: 'slug',
							type: 'string',
						},
					],
				},
			],
			fieldset: 'commerce',
		},
		{
			title: 'Assets',
			name: 'assets',
			type: 'array',
			of: [{ type: 'asset' }],
			fieldset: 'commerce',
		},
		{
			title: 'Breadcrumbs',
			name: 'breadcrumbs',
			type: 'array',
			of: [{ type: 'breadcrumb' }],
			fieldset: 'commerce',
		},
	],
};
