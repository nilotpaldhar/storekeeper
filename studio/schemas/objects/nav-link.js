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
			description: 'Text to Display',
			validation: (Rule) => Rule.required().error('The title is required'),
		},
		{
			title: 'Is External',
			name: 'isExternal',
			type: 'boolean',
			initialValue: false,
		},
		{
			title: 'Internal URL',
			name: 'internalUrl',
			type: 'string',
			description: 'enter an internal URL',
			initialValue: '#',
			hidden: ({ document }) => document?.isExternal,
		},
		{
			title: 'External URL',
			name: 'externalUrl',
			type: 'url',
			description: 'enter an external URL',
			hidden: ({ document }) => !document?.isExternal,
		},
	],
	preview: {
		select: { title: 'title' },
		prepare({ title }) {
			return { title };
		},
	},
};
