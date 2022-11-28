export default {
	title: 'Product Conditionals',
	name: 'productConditionals',
	type: 'object',
	fields: [
		{
			title: 'Active',
			name: 'isActive',
			initialValue: false,
			type: 'boolean',
		},
		{
			title: 'Tax Exempt',
			name: 'isTaxExempt',
			initialValue: false,
			type: 'boolean',
		},
		{
			title: 'Pay What You Want',
			name: 'isPayWhatYouWant',
			initialValue: false,
			type: 'boolean',
		},
		{
			title: 'Inventory Managed',
			name: 'isInventoryManaged',
			initialValue: false,
			type: 'boolean',
		},
		{
			title: 'Sold Out',
			name: 'isSoldOut',
			initialValue: false,
			type: 'boolean',
		},
		{
			title: 'Has Digital Delivery',
			name: 'hasDigitalDelivery',
			initialValue: false,
			type: 'boolean',
		},
		{
			title: 'Has Physical Delivery',
			name: 'hasPhysicalDelivery',
			initialValue: false,
			type: 'boolean',
		},
		{
			title: 'Has Images',
			name: 'hasImages',
			initialValue: false,
			type: 'boolean',
		},
		{
			title: 'Collects Fullname',
			name: 'collectsFullname',
			initialValue: false,
			type: 'boolean',
		},
		{
			title: 'Collects Shipping Address',
			name: 'collectsShippingAddress',
			initialValue: false,
			type: 'boolean',
		},
		{
			title: 'Collects Billing Address',
			name: 'collectsBillingAddress',
			initialValue: false,
			type: 'boolean',
		},
		{
			title: 'Collects Extra Fields',
			name: 'collectsExtraFields',
			initialValue: false,
			type: 'boolean',
		},
	],
};
