import { defineField } from 'sanity';
import { RiNavigationLine } from 'react-icons/ri';
import { BsInfoCircle } from 'react-icons/bs';

export default {
	title: 'Header Settings',
	name: 'headerSettings',
	type: 'document',
	icon: RiNavigationLine,
	fieldsets: [
		{
			title: 'Desktop',
			name: 'desktop',
			description: 'Navigation settings for desktop view',
			options: { collapsed: false },
		},
		{
			title: 'Mobile',
			name: 'mobile',
			description: 'Navigation settings for mobile view',
			options: { collapsed: false },
		},
	],
	fields: [
		defineField({
			name: 'navNote',
			title: 'Note',
			description: `On desktop, dropdowns will appear as a "mega-dropdowns". On mobile, dropdowns will appear as "accordions".`,
			type: 'note',
			options: {
				icon: BsInfoCircle,
				tone: 'caution',
			},
		}),
		{
			title: 'Desktop Menu',
			name: 'menuDesktop',
			type: 'reference',
			to: [{ type: 'menu' }],
			fieldset: 'desktop',
		},
		{
			title: 'Mobile Menu',
			name: 'menuMobile',
			type: 'reference',
			to: [{ type: 'menu' }],
			fieldset: 'mobile',
		},
	],
	preview: {
		prepare() {
			return {
				title: 'Header Settings',
			};
		},
	},
};
