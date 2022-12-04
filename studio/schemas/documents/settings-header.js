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
		{
			name: 'navNote',
			type: 'note',
			options: {
				icon: BsInfoCircle,
				headline: 'Note',
				message: `On mobile, "dropdowns" and "mega-dropdowns" will appear as accordions.`,
				tone: 'caution',
			},
		},
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
