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
			title: 'Page',
			name: 'page',
			type: 'reference',
			to: [{ type: 'product' }],
		},
	],
	preview: {
		select: { title: 'title' },
		prepare({ title }) {
			return { title };
		},
	},
};
