import { AiOutlineUser } from 'react-icons/ai';

export default {
	name: 'user',
	title: 'User',
	type: 'document',
	icon: AiOutlineUser,
	fields: [
		{
			name: 'firstname',
			title: 'First Name',
			type: 'string',
		},
		{
			name: 'lastname',
			title: 'Last Name',
			type: 'string',
		},
		{
			name: 'email',
			title: 'Email',
			type: 'string',
		},
		{
			name: 'phone',
			title: 'Phone',
			type: 'string',
		},
		{
			name: 'emailVerified',
			title: 'Email Verified',
			type: 'datetime',
		},
		{
			name: 'image',
			title: 'Image',
			type: 'url',
		},
		{
			name: 'checId',
			title: 'Commerce.js ID',
			type: 'string',
			readOnly: true,
		},
		{
			name: 'cartId',
			title: 'Cart ID',
			type: 'string',
			readOnly: true,
			hidden: true,
		},
	],
	preview: {
		select: {
			title: 'firstname',
			firstname: 'firstname',
			lastname: 'lastname',
			subtitle: 'email',
		},
		prepare({ firstname = '', lastname = '', subtitle }) {
			const title = `${firstname} ${lastname}`.trim();
			return {
				title: title || '(missing first/last name)',
				subtitle: subtitle || '(missing email)',
			};
		},
	},
};
