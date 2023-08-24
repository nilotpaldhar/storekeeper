import { FiLink2 } from 'react-icons/fi';

export default {
	title: 'Page',
	name: 'navPage',
	type: 'object',
	icon: FiLink2,
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			description: 'Text to Display',
		},
		{
			title: 'Page',
			name: 'page',
			type: 'reference',
			to: [{ type: 'homepage' }, { type: 'page' }],
			validation: (Rule) => Rule.required().error('The page is required'),
			options: { disableNew: true },
		},
	],
	preview: {
		select: { title: 'title' },
		prepare({ title }) {
			return { title };
		},
	},
};
