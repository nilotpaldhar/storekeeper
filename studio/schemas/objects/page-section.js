export default {
	title: 'Page Section',
	name: 'pageSection',
	type: 'object',
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
		},
		{
			title: 'Linked Page (Product or Category)',
			name: 'linkedPage',
			type: 'reference',
			to: [{ type: 'product' }, { type: 'category' }],
		},
		{
			title: 'List of products',
			name: 'products',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'product' }],
				},
			],
		},
		{
			title: 'Hide Section',
			name: 'hidden',
			initialValue: false,
			type: 'boolean',
		},
	],
};
