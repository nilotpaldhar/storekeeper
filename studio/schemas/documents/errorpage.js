import { MdErrorOutline } from 'react-icons/md';

export default {
	title: 'Error Page',
	name: 'errorpage',
	type: 'document',
	icon: MdErrorOutline,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'required',
			initialValue: 'Error Page (404)',
			validation: (Rule) => [
				Rule.required().error('The title is required'),
				Rule.max(20).error(`The title shouldn't be more than 20 characters`),
			],
		},
		{
			title: 'Description',
			name: 'description',
			rows: 5,
			type: 'text',
			validation: (Rule) =>
				Rule.max(100).error(`The description shouldn't be more than 100 characters`),
		},
		{
			title: 'SEO / Share Settings',
			name: 'seo',
			type: 'seo',
		},
	],
	preview: {
		select: { title: 'title' },
		prepare({ title = 'Error Page (404)' }) {
			return { title };
		},
	},
};
