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
			validation: (Rule) => Rule.required().error('The title is required'),
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
