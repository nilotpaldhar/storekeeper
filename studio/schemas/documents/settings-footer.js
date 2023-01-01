import { FiAnchor } from 'react-icons/fi';

export default {
	title: 'Footer Settings',
	name: 'footerSettings',
	type: 'document',
	icon: FiAnchor,
	fieldsets: [
		{
			title: 'About Block',
			name: 'aboutBlock',
			description: 'Settings for the footer about block',
			options: { collapsible: true },
		},
		{
			title: 'Navigation Block One',
			name: 'navBlock1',
			description: 'Settings for the first footer navigation block',
			options: { collapsible: true },
		},
		{
			title: 'Navigation Block Two',
			name: 'navBlock2',
			description: 'Settings for the second footer navigation block',
			options: { collapsible: true },
		},
		{
			title: 'Navigation Block Three',
			name: 'navBlock3',
			description: 'Settings for the third footer navigation block',
			options: { collapsible: true },
		},
		{
			title: 'Info Block',
			name: 'infoBlock',
			description: 'Settings for the footer info block',
			options: { collapsible: true },
		},
	],
	fields: [
		/** About Block. */
		{
			title: 'About Your Company',
			name: 'aboutCompany',
			type: 'text',
			rows: 3,
			fieldset: 'aboutBlock',
		},
		{
			title: 'Read More Link',
			name: 'readMoreLink',
			type: 'navPage',
			fieldset: 'aboutBlock',
		},
		{
			title: 'Copyright Text',
			name: 'copyrightText',
			type: 'string',
			fieldset: 'aboutBlock',
		},

		/** Navigation Block One. */
		{
			title: 'Title',
			name: 'navBlockTitle1',
			type: 'string',
			initialValue: 'Company',
			fieldset: 'navBlock1',
		},
		{
			title: 'Menu Items',
			name: 'navBlockMenuItems1',
			type: 'array',
			of: [{ type: 'navLink' }, { type: 'navPage' }],
			fieldset: 'navBlock1',
		},

		/** Navigation Block Two. */
		{
			title: 'Title',
			name: 'navBlockTitle2',
			type: 'string',
			initialValue: 'Information',
			fieldset: 'navBlock2',
		},
		{
			title: 'Menu Items',
			name: 'navBlockMenuItems2',
			type: 'array',
			of: [{ type: 'navLink' }, { type: 'navPage' }],
			fieldset: 'navBlock2',
		},

		/** Navigation Block Three. */
		{
			title: 'Title',
			name: 'navBlockTitle3',
			type: 'string',
			initialValue: 'Account',
			fieldset: 'navBlock3',
		},
		{
			title: 'Menu Items',
			name: 'navBlockMenuItems3',
			type: 'array',
			of: [{ type: 'navLink' }, { type: 'navPage' }],
			fieldset: 'navBlock3',
		},

		/** Info Block. */
		{
			title: 'Title',
			name: 'infoBlockTitle',
			type: 'string',
			initialValue: 'Need Help?',
			fieldset: 'infoBlock',
		},
		{
			title: 'Email Address',
			name: 'emailAddress',
			type: 'string',
			fieldset: 'infoBlock',
		},
		{
			title: 'Phone Number',
			name: 'phoneNumber',
			type: 'string',
			fieldset: 'infoBlock',
		},
	],
	preview: {
		prepare() {
			return {
				title: 'Footer Settings',
			};
		},
	},
};
