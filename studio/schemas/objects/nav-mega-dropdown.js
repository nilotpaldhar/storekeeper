import { HiChevronDoubleDown } from 'react-icons/hi';

export default {
	title: 'Mega Dropdown',
	name: 'navMegaDropdown',
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
			of: [{ type: 'navDropdown' }],
		},
	],
	preview: {
		select: { title: 'title' },
		prepare({ title }) {
			return { title };
		},
	},
};
