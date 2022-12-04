import { HiChevronDown } from 'react-icons/hi';

export default {
	title: 'Dropdown',
	name: 'navDropdown',
	type: 'object',
	icon: HiChevronDown,
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
			of: [{ type: 'navLink' }, { type: 'navPage' }],
		},
	],
	preview: {
		select: { title: 'title' },
		prepare({ title }) {
			return { title };
		},
	},
};
