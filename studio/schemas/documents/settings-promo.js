export default {
	title: 'Promo Bar Settings',
	name: 'promoSettings',
	type: 'document',
	fields: [
		{
			title: 'Enable Promo Bar?',
			name: 'enabled',
			type: 'boolean',
		},
		{
			title: 'Display Location',
			name: 'displayLocation',
			type: 'string',
			options: {
				list: [
					{ title: 'All Pages', value: 'all' },
					{ title: 'Home Page only', value: 'home' },
				],
				layout: 'radio',
			},
			description: 'Choose where the promo bar is displayed',
			initialValue: 'all',
			hidden: ({ parent }) => !parent.enabled,
			validation: (Rule) =>
				Rule.custom((field, context) =>
					context.parent.enabled && field === undefined
						? 'Display Location must be set when promo bar is enabled'
						: true
				),
		},
		{
			title: 'Expiry Date',
			name: 'expiryDate',
			type: 'datetime',
			hidden: ({ parent }) => !parent.enabled,
		},
		{
			title: 'Text',
			name: 'text',
			type: 'text',
			rows: 3,
			description: 'The text to show on the banner',
			hidden: ({ parent }) => !parent.enabled,
			validation: (Rule) => Rule.max(100).error('The text may not exceed 100 characters'),
		},
		{
			title: 'Page Link',
			name: 'link',
			type: 'navPage',
			description: '(optional) Select a page to link the promo banner to',
			hidden: ({ parent }) => !parent.enabled,
		},
	],
	preview: {
		prepare() {
			return {
				title: 'Promo Bar Settings',
			};
		},
	},
};
