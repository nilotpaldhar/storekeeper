import { BsGrid3X3Gap } from 'react-icons/bs';

export default {
	title: 'Category',
	name: 'navCategory',
	type: 'object',
	icon: BsGrid3X3Gap,
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			description: 'Text to Display',
		},
		{
			title: 'Category',
			name: 'linkedCategory',
			type: 'reference',
			to: [{ type: 'category' }],
			validation: (Rule) => Rule.required().error('The category is required'),
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
