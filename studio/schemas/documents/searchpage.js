import { AiOutlineSearch } from 'react-icons/ai';

export default {
	title: 'Search Page',
	name: 'searchpage',
	type: 'document',
	icon: AiOutlineSearch,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'required',
			initialValue: 'Search Page',
			validation: (Rule) => Rule.required().error('The title is required'),
		},
		{
			title: 'URL Slug or Path',
			name: 'slug',
			type: 'string',
			initialValue: '/search',
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
