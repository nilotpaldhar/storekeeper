import { AiOutlineHome } from 'react-icons/ai';

export default {
	title: 'Home Page',
	name: 'homepage',
	type: 'document',
	icon: AiOutlineHome,
	fieldsets: [
		{
			title: 'Products Collection',
			name: 'productsCollection',
		},
	],
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'required',
			initialValue: 'Home Page',
			validation: (Rule) => Rule.required().error('The title is required'),
		},
		{
			title: 'URL Slug or Path',
			name: 'slug',
			type: 'string',
			initialValue: '/',
			readOnly: true,
		},

		// Categories
		{
			title: 'List of Categories',
			name: 'categories',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: true,
			},
			fields: [
				{
					name: 'title',
					title: 'Title',
					type: 'string',
					description: 'required',
					validation: (Rule) => Rule.required().error('The title is required'),
				},
				{
					title: 'Hide Section',
					name: 'hidden',
					initialValue: false,
					type: 'boolean',
				},
				{
					title: 'Categories',
					name: 'collection',
					type: 'array',
					of: [
						{
							type: 'reference',
							to: [{ type: 'category' }],
						},
					],
				},
			],
		},

		// Products Collection
		{
			title: 'Top Rated Products',
			name: 'topRatedProducts',
			type: 'pageSection',
			fieldset: 'productsCollection',
		},

		{
			title: 'Featured Products',
			name: 'featuredProducts',
			type: 'object',
			fieldset: 'productsCollection',
			options: { collapsible: true, collapsed: true },
			fields: [
				{
					title: 'List of products',
					name: 'products',
					type: 'array',
					of: [
						{
							type: 'reference',
							to: [{ type: 'product' }],
						},
					],
				},
				{
					title: 'Hide Section',
					name: 'hidden',
					initialValue: false,
					type: 'boolean',
				},
			],
		},

		{
			title: 'New Products',
			name: 'newProducts',
			type: 'pageSection',
			fieldset: 'productsCollection',
		},

		// SEO
		{
			title: 'SEO / Share Settings',
			name: 'seo',
			type: 'seo',
		},
	],
	preview: {
		select: { title: 'title' },
		prepare({ title = 'Home Page' }) {
			return { title };
		},
	},
};
