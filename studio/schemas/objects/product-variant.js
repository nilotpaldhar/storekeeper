export default {
	title: 'Product Variant',
	name: 'productVariant',
	type: 'object',
	fields: [
		{
			title: 'ID',
			name: 'id',
			type: 'string',
		},
		{
			title: 'Name',
			name: 'name',
			type: 'string',
		},
		{
			title: 'Options',
			name: 'options',
			type: 'array',
			of: [
				{
					title: 'Options',
					type: 'object',
					fields: [
						{
							title: 'ID',
							name: 'id',
							type: 'string',
						},
						{
							title: 'Name',
							name: 'name',
							type: 'string',
						},
						{
							title: 'Price',
							name: 'price',
							type: 'productPrice',
						},
						{
							title: 'Assets',
							name: 'assets',
							type: 'array',
							of: [{ type: 'string' }],
						},
					],
				},
			],
		},
	],
};
