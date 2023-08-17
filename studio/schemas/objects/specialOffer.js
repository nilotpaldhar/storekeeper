export default {
	title: 'Special Offer',
	name: 'specialOffer',
	type: 'object',
	options: {
		collapsible: true,
		collapsed: true,
	},
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			description: 'required',
			initialValue: 'Special Offer',
			validation: (Rule) => [
				Rule.required().error('The title is required'),
				Rule.max(20).error(`The title shouldn't be more than 20 characters`),
			],
		},
		{
			title: 'Description',
			name: 'description',
			rows: 5,
			type: 'text',
			validation: (Rule) => [
				Rule.required().error('The description is required'),
				Rule.max(50).error(`The description shouldn't be more than 50 characters`),
			],
		},
		{
			title: 'Thumbnail (750x600)',
			name: 'thumbnail',
			type: 'image',
			options: { hotspot: true },
			description: 'required',
			validation: (Rule) => Rule.required().error('The thumbnail is required'),
		},
		{
			title: 'Price',
			name: 'price',
			type: 'object',
			fields: [
				{
					title: 'Original Price',
					name: 'original',
					type: 'number',
					description: 'required',
					validation: (Rule) => Rule.required().error('Original price is required'),
				},
				{
					title: 'Price After Discount',
					name: 'discount',
					type: 'number',
					description: 'required',
					validation: (Rule) => Rule.required().error('Price after discount is required'),
				},
				{
					title: 'Amount Saved',
					name: 'saved',
					type: 'number',
				},
			],
		},
		{
			title: 'Date',
			name: 'date',
			type: 'object',
			fields: [
				{
					title: 'Starts At',
					name: 'start',
					type: 'datetime',
					description: 'required',
					validation: (Rule) => Rule.required().error('Offer starting date is required'),
					options: {
						dateFormat: 'YYYY-MM-DD',
						timeFormat: 'HH:mm',
						timeStep: 1,
						calendarTodayLabel: 'Today',
					},
				},
				{
					title: 'Ends On',
					name: 'end',
					type: 'datetime',
					description: 'required',
					validation: (Rule) => Rule.required().error('Offer ending date is required'),
					options: {
						dateFormat: 'YYYY-MM-DD',
						timeFormat: 'HH:mm',
						timeStep: 1,
						calendarTodayLabel: 'Today',
					},
				},
			],
		},
		{
			title: 'Product',
			name: 'product',
			type: 'reference',
			to: [{ type: 'product' }],
			description: 'required',
			validation: (Rule) => Rule.required().error('Product is required'),
		},
		{
			title: 'Hide Section',
			name: 'hidden',
			initialValue: false,
			type: 'boolean',
		},
	],
};
