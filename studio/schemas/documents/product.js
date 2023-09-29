import { BsGift } from 'react-icons/bs';

export default {
	title: 'Products',
	name: 'product',
	type: 'document',
	icon: BsGift,
	fieldsets: [
		{
			title: 'Commerce',
			name: 'commerce',
			description: 'Product data synced from Chec/Commerce.js',
			readOnly: true,
			options: { collapsible: true, collapsed: false },
		},
	],
	fields: [
		{
			title: 'Name (display)',
			name: 'displayName',
			type: 'string',
		},
		{
			title: 'Excerpt',
			name: 'excerpt',
			type: 'text',
			rows: 4,
		},
		{
			title: 'Brand',
			name: 'brand',
			type: 'reference',
			to: [{ type: 'brand' }],
		},
		{
			title: 'Color',
			name: 'color',
			type: 'reference',
			to: [{ type: 'productColor' }],
		},
		{
			title: 'Description',
			name: 'description',
			type: 'portableContent',
		},
		{
			title: 'Additional Information',
			name: 'additionalInfo',
			type: 'array',
			of: [{ type: 'productSpec' }],
		},
		{
			title: 'SEO / Share Settings',
			name: 'seo',
			type: 'seo',
		},
		{
			title: 'ID',
			name: 'productID',
			type: 'string',
			fieldset: 'commerce',
		},
		{
			title: 'Name',
			name: 'name',
			type: 'string',
			fieldset: 'commerce',
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'string',
			fieldset: 'commerce',
		},
		{
			title: 'Is Active',
			name: 'isActive',
			type: 'boolean',
			initialValue: false,
			fieldset: 'commerce',
		},
		{
			title: 'SKU',
			name: 'sku',
			type: 'string',
			fieldset: 'commerce',
		},
		{
			title: 'Categories',
			name: 'categories',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'category' }] }],
			fieldset: 'commerce',
		},
		{
			title: 'Image',
			name: 'image',
			type: 'asset',
			fieldset: 'commerce',
		},
		{
			title: 'Assets',
			name: 'assets',
			type: 'array',
			of: [{ type: 'asset' }],
			fieldset: 'commerce',
		},
		{
			title: 'Price',
			name: 'price',
			type: 'productPrice',
			fieldset: 'commerce',
		},
		{
			title: 'Inventory',
			name: 'inventory',
			type: 'productInventory',
			fieldset: 'commerce',
		},
		{
			title: 'Conditionals',
			name: 'conditionals',
			type: 'productConditionals',
			fieldset: 'commerce',
		},
		{
			title: 'Variant Groups',
			name: 'variantGroups',
			type: 'array',
			of: [{ type: 'productVariant' }],
			fieldset: 'commerce',
		},
		{
			title: 'Statistics',
			name: 'statistics',
			type: 'object',
			fields: [
				{
					title: 'Orders',
					name: 'orders',
					type: 'number',
				},
				{
					title: 'Sales',
					name: 'sales',
					type: 'productPrice',
				},
			],
			fieldset: 'commerce',
		},
		{
			title: 'Checkout',
			name: 'checkout',
			type: 'object',
			fields: [
				{
					title: 'Checkout URL',
					name: 'checkoutURL',
					type: 'url',
				},
				{
					title: 'Checkout Display',
					name: 'checkoutDisplay',
					type: 'url',
				},
			],
			fieldset: 'commerce',
		},
		{
			title: 'Thank You Page',
			name: 'thankYouPage',
			type: 'string',
			fieldset: 'commerce',
		},
		{
			title: 'Related Products',
			name: 'relatedProducts',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'product' }] }],
			fieldset: 'commerce',
		},
	],
	preview: {
		select: { title: 'name' },
		prepare({ title }) {
			return { title };
		},
	},
};
