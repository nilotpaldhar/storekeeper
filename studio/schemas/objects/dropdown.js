import { HiChevronDown } from 'react-icons/hi';

export default {
	title: 'Dropdown',
	name: 'dropdown',
	type: 'object',
	icon: HiChevronDown,
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			description: 'required',
			validation: (Rule) => Rule.required().error('The title is required'),
		},
		{
			title: 'Items',
			name: 'items',
			type: 'array',
			of: [
				{ type: 'navLink' },
				{ type: 'navPage' },
				{ type: 'navProduct' },
				{ type: 'navCategory' },
			],
		},
	],
	preview: {
		select: { title: 'title' },
		prepare({ title }) {
			return { title };
		},
	},
};
