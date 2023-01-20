import { AiOutlineLock } from 'react-icons/ai';

export default {
	title: 'Login Page',
	name: 'loginpage',
	type: 'document',
	icon: AiOutlineLock,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'required',
			initialValue: 'Login',
			validation: (Rule) => Rule.required().error('The title is required'),
		},
		{
			title: 'URL Slug or Path',
			name: 'slug',
			type: 'string',
			initialValue: '/login',
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
		prepare({ title = 'Login Page', slug }) {
			return { title, subtitle: slug };
		},
	},
};
