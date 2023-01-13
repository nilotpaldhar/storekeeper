export default {
	name: 'verificationToken',
	title: 'Verification Token',
	type: 'document',
	readOnly: true,
	fields: [
		{
			name: 'identifier',
			title: 'Identifier',
			type: 'string',
		},
		{
			name: 'token',
			title: 'Token',
			type: 'string',
		},
		{
			name: 'expires',
			title: 'Expires',
			type: 'datetime',
		},
	],
	preview: {
		select: { title: 'identifier', subtitle: 'expires' },
		prepare({ title, subtitle }) {
			return {
				title: title || '(missing identifier)',
				subtitle: subtitle || '(missing expiry date)',
			};
		},
	},
};
