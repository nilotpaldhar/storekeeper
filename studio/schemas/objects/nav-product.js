import { BsGift } from 'react-icons/bs';

export default {
	title: 'Product',
	name: 'navProduct',
	type: 'object',
	icon: BsGift,
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			description: 'Text to Display',
		},
		{
			title: 'Product',
			name: 'linkedProduct',
			type: 'reference',
			to: [{ type: 'product' }],
			validation: (Rule) => Rule.required().error('The product is required'),
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
