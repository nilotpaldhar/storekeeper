export default {
	name: 'account',
	title: 'Account',
	type: 'document',
	fields: [
		{
			name: 'providerType',
			type: 'string',
		},
		{
			name: 'providerId',
			type: 'string',
		},
		{
			name: 'providerAccountId',
			type: 'string',
		},
		{
			name: 'refreshToken',
			title: 'Refresh Token',
			type: 'string',
			readOnly: true,
		},
		{
			name: 'accessToken',
			title: 'Access Token',
			type: 'string',
			readOnly: true,
		},
		{
			name: 'accessTokenExpires',
			title: 'Access Token Expires',
			type: 'string',
			readOnly: true,
		},
		{
			name: 'userId',
			title: 'User ID',
			type: 'string',
			readOnly: true,
		},
	],
	preview: {
		select: { title: 'providerId', subtitle: 'providerType' },
		prepare({ title = '', subtitle }) {
			return {
				title: title.toUpperCase() || '(missing provider ID)',
				subtitle: subtitle || '(missing provider type)',
			};
		},
	},
};
