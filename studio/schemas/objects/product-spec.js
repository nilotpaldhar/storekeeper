export default {
	title: 'Product Specification',
	name: 'productSpec',
	type: 'object',
	fields: [
		{
			title: 'Name',
			name: 'name',
			type: 'string',
			description: 'required',
			validation: (Rule) => Rule.required().error('The name is required'),
		},
		{
			title: 'Value',
			name: 'value',
			type: 'string',
			description: 'required',
			validation: (Rule) => Rule.required().error('The value is required'),
		},
	],
	preview: {
		select: { title: 'name', subtitle: 'value' },
	},
};
