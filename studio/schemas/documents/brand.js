import { TfiAnnouncement } from 'react-icons/tfi';

export default {
	title: 'Brands',
	name: 'brand',
	type: 'document',
	icon: TfiAnnouncement,
	fields: [
		{
			title: 'Title',
			name: 'title',
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
	],
	preview: {
		select: { title: 'title' },
		prepare({ title = 'Untitled' }) {
			return { title };
		},
	},
};
