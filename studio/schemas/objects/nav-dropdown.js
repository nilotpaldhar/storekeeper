import { HiChevronDoubleDown } from 'react-icons/hi';

export default {
	title: 'Dropdown',
	name: 'navDropdown',
	type: 'object',
	icon: HiChevronDoubleDown,
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			description: 'Text to Display',
			validation: (Rule) => Rule.required().error('The title is required'),
		},
		{
			title: 'Items',
			name: 'items',
			type: 'array',
			of: [{ type: 'dropdown' }],
		},
	],
	preview: {
		select: { title: 'title' },
		prepare({ title }) {
			return { title };
		},
	},
};
