import { BsCart } from 'react-icons/bs';

export default {
	title: 'Shop Page',
	name: 'shoppage',
	type: 'document',
	icon: BsCart,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'required',
			initialValue: 'Shop Page',
			validation: (Rule) => Rule.required().error('The title is required'),
		},
		{
			title: 'URL Slug or Path',
			name: 'slug',
			type: 'string',
			initialValue: '/shop',
			readOnly: true,
		},
		{
			title: 'SEO / Share Settings',
			name: 'seo',
			type: 'seo',
		},
	],
	preview: {
		select: { title: 'title', slug: 'slug' },
		prepare({ title = 'Shop Page', slug }) {
			return { title, subtitle: slug };
		},
	},
};
