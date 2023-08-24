import { FiExternalLink } from 'react-icons/fi';

export default {
	title: 'Link',
	name: 'navLink',
	type: 'object',
	icon: FiExternalLink,
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			description: 'required',
			validation: (Rule) => Rule.required().error('The title is required'),
		},
		{
			title: 'Is External',
			name: 'isExternal',
			type: 'boolean',
			initialValue: false,
		},
		{
			title: 'URL/Slug',
			name: 'url',
			type: 'slug',
			description: 'required',
			options: { source: (_, context) => context?.parent?.title, maxLength: 30 },
			validation: (Rule) => Rule.required().error('The URL is required'),
		},
	],
	preview: {
		select: { title: 'title' },
		prepare({ title }) {
			return { title };
		},
	},
};
