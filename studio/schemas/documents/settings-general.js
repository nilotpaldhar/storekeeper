export default {
	title: 'General Settings',
	name: 'generalSettings',
	type: 'document',
	fields: [
		{
			title: 'Site Title',
			name: 'siteTitle',
			type: 'string',
			description: 'The name of your site, usually your company/brand name',
		},
		{
			title: 'Site Description',
			name: 'siteDescription',
			type: 'text',
			rows: 3,
			description: 'The description of your site will appear in the footer area',
		},
		{
			title: 'Live Site URL',
			description: 'The root domain or subdomain of your website',
			name: 'siteURL',
			type: 'url',
		},
		{
			title: 'Site Logo',
			name: 'siteLogo',
			type: 'image',
			options: { hotspot: true },
		},
	],
	preview: {
		prepare() {
			return {
				title: 'General Settings',
			};
		},
	},
};
