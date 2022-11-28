export default {
	title: 'Product Inventory',
	name: 'productInventory',
	type: 'object',
	fields: [
		{
			title: 'Is Managed',
			name: 'isManaged',
			initialValue: false,
			type: 'boolean',
		},
		{
			title: 'Available',
			name: 'available',
			type: 'number',
		},
	],
};
