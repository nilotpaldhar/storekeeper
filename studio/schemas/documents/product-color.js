import { MdOutlineColorLens } from 'react-icons/md';

export default {
	title: 'Colors',
	name: 'productColor',
	type: 'document',
	icon: MdOutlineColorLens,
	fields: [
		{
			title: 'Name',
			name: 'name',
			type: 'string',
			description: 'required',
			validation: (Rule) => Rule.required().error('The name is required'),
		},
		{
			title: 'Code',
			name: 'colorCode',
			type: 'color',
			description: 'required',
			validation: (Rule) => Rule.required().error('The color code is required'),
			options: { disableAlpha: true },
		},
	],
};
