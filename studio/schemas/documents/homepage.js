import { AiOutlineHome } from 'react-icons/ai';

export default {
	title: 'Home Page',
	name: 'homepage',
	type: 'document',
	icon: AiOutlineHome,
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
