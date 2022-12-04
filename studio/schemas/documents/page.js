import { FiLink2 } from 'react-icons/fi';

export default {
	title: 'Pages',
	name: 'page',
	type: 'document',
	icon: FiLink2,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'required',
			validation: (Rule) => Rule.required().error('The title is required'),
		},
		{
			title: 'URL Slug',
			name: 'slug',
			type: 'slug',
			description: '(required)',
			options: { source: 'title', maxLength: 96 },
			validation: (Rule) => Rule.required().error('The slug is required'),
		},
		{
			title: 'SEO / Share Settings',
			name: 'seo',
			type: 'seo',
		},
	],
	preview: {
		select: { title: 'title', slug: 'slug' },
		prepare({ title = 'Untitled', slug }) {
			const subtitle = slug?.current ? `/${slug?.current}` : '(missing slug)';
			return { title, subtitle };
		},
	},
};
