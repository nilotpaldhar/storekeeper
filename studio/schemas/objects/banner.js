export default {
	title: 'Banner',
	name: 'banner',
	type: 'object',
	fieldsets: [
		{
			title: 'Assets',
			name: 'assets',
			options: { collapsible: false },
		},
	],
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			description: 'required',
			validation: (Rule) => [
				Rule.required().error('The title is required'),
				Rule.max(50).error(`The title shouldn't be more than 50 characters`),
			],
		},
		{
			title: 'Description',
			name: 'description',
			rows: 5,
			type: 'text',
			validation: (Rule) =>
				Rule.max(150).error(`The description shouldn't be more than 150 characters`),
		},
		{
			title: 'Price',
			name: 'price',
			type: 'object',
			fields: [
				{
					title: 'Prefix',
					name: 'prefix',
					type: 'string',
					initialValue: 'Starts At',
					description: 'required',
					validation: (Rule) => [
						Rule.required().error('The prefix is required'),
						Rule.max(10).error(`The prefix shouldn't be more than 10 characters`),
					],
				},
				{
					title: 'Amount',
					name: 'amount',
					type: 'number',
					initialValue: '0.00',
					description: 'required',
					validation: (Rule) => Rule.required().error('The amount is required'),
				},
			],
		},
		{
			title: 'Link',
			name: 'link',
			type: 'object',
			fields: [
				{
					title: 'Text',
					name: 'text',
					type: 'string',
					initialValue: 'Discover Now',
				},
				{
					title: 'Resource',
					name: 'resource',
					type: 'reference',
					to: [{ type: 'page' }, { type: 'category' }, { type: 'product' }],
				},
			],
		},
		{
			title: 'Thumbnail (600x600)',
			name: 'thumbnail',
			type: 'image',
			options: { hotspot: true },
			description: 'required',
			validation: (Rule) => Rule.required().error('The thumbnail is required'),
			fieldset: 'assets',
		},
		{
			title: 'Backdrop (1500x600)',
			name: 'backdrop',
			type: 'image',
			options: { hotspot: true },
			fieldset: 'assets',
		},
		{
			title: 'Content Alignment (Left or Right)',
			name: 'contentAlignment',
			type: 'string',
			options: {
				list: [
					{ title: 'Left', value: 'left' },
					{ title: 'Right', value: 'right' },
				],
				layout: 'radio',
				direction: 'horizontal',
			},
			initialValue: 'left',
		},
	],
};
