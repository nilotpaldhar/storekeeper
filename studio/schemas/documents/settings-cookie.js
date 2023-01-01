export default {
	title: 'Cookie Consent Settings',
	name: 'cookieSettings',
	type: 'document',
	fields: [
		{
			name: 'cookiePolicyNote',
			type: 'note',
			options: {
				headline: 'Important',
				message:
					'This displays an "implied consent" cookie notice to users to help comply with GDPR laws. It is strongly encouraged to include a link to your cookie usage and policies.',
				tone: 'caution',
			},
		},
		{
			title: 'Enable Cookie Consent?',
			name: 'enabled',
			type: 'boolean',
		},
		{
			title: 'Message',
			name: 'message',
			type: 'text',
			rows: 3,
			description: 'Your cookie consent message',
			hidden: ({ parent }) => !parent.enabled,
			validation: (Rule) => Rule.max(200).error('The message may not exceed 200 characters'),
		},
		{
			title: 'Link to Cookie Policy',
			name: 'link',
			type: 'reference',
			to: [{ type: 'page' }],
			options: { disableNew: true },
			description: 'Show a link to "Learn More" about your cookie policy',
			hidden: ({ parent }) => !parent.enabled,
		},
	],
	preview: {
		prepare() {
			return {
				title: 'Cookie Consent Settings',
			};
		},
	},
};
