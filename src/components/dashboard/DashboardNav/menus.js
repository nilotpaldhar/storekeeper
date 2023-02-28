import { nanoid } from 'nanoid';

const menus = [
	{
		id: nanoid(),
		label: 'Dashboard',
		href: '/dashboard',
	},
	{
		id: nanoid(),
		label: 'Account Details',
		href: '/dashboard/account',
	},
];

export default menus;
