export default {
	title: 'Social Profiles',
	name: 'socialSettings',
	type: 'document',
	fields: [
		{
			title: 'Facebook',
			name: 'facebook',
			type: 'url',
			description: 'E.g. https://www.facebook.com/username',
		},
		{
			title: 'Twitter',
			name: 'twitter',
			type: 'url',
			description: 'E.g. https://twitter.com/username',
		},
		{
			title: 'Instagram',
			name: 'instagram',
			type: 'url',
			description: 'E.g. https://www.instagram.com/username',
		},
		{
			title: 'Linkedin',
			name: 'linkedin',
			type: 'url',
			description: 'E.g. https://www.linkedin.com/in/username',
		},
	],
	preview: {
		prepare() {
			return {
				title: 'Social Profiles',
			};
		},
	},
};
