export default {
	title: 'Offer',
	name: 'offer',
	type: 'object',
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			description: 'required',
			validation: (Rule) => [
				Rule.required().error('The title is required'),
				Rule.max(20).error(`The title shouldn't be more than 20 characters`),
			],
		},
		{
			title: 'Content',
			name: 'content',
			type: 'array',
			// description: 'max 50 characters',
			// validation: (Rule) => Rule.max(50).error(`The content shouldn't be more than 50 characters`),
			of: [
				{
					title: 'Block',
					type: 'block',
					styles: [{ title: 'Paragraph', value: 'normal' }],
					lists: [],
					marks: {
						decorators: [
							{ title: 'Strong', value: 'strong' },
							{ title: 'Emphasis', value: 'em' },
							{ title: 'Underline', value: 'underline' },
						],
					},
				},
			],
		},
		{
			title: 'Thumbnail (400x200)',
			name: 'thumbnail',
			type: 'image',
			options: { hotspot: true },
			description: 'required',
			validation: (Rule) => Rule.required().error('The thumbnail is required'),
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
			},
			initialValue: 'left',
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
					initialValue: 'Shop Now',
				},
				{
					title: 'URL',
					name: 'url',
					type: 'reference',
					to: [{ type: 'page' }, { type: 'category' }, { type: 'product' }],
				},
			],
		},
	],
};
