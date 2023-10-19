export default {
	name: 'wishlist',
	title: 'Wishlist',
	type: 'document',
	fields: [
		{
			name: 'items',
			title: 'Items',
			type: 'array',
			validation: (Rule) => Rule.unique().error('Item already exists'),
			of: [
				{
					type: 'reference',
					to: [{ type: 'product' }],
				},
			],
		},
	],
	preview: {
		select: { items: 'items' },
		prepare({ items }) {
			const length = items?.length ?? 0;
			return {
				title: 'Wishlist',
				subtitle: `Total Items: ${length}`,
			};
		},
	},
};
