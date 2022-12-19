import { BsList } from 'react-icons/bs';

export default {
	title: 'Menus',
	name: 'menu',
	type: 'document',
	icon: BsList,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required().error('The title is required'),
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			description: 'required',
			options: { source: 'title', maxLength: 30 },
			validation: (Rule) => Rule.required().error('The slug is required'),
		},
		{
			title: 'Nav Items',
			name: 'items',
			type: 'array',
			of: [{ type: 'navLink' }, { type: 'navPage' }, { type: 'navDropdown' }],
		},
	],
};
