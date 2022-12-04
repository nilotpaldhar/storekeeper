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
			title: 'Page',
			name: 'page',
			type: 'reference',
			to: [{ type: 'category' }],
		},
	],
	preview: {
		select: { title: 'title' },
		prepare({ title }) {
			return { title };
		},
	},
};
