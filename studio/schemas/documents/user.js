import { AiOutlineUser } from 'react-icons/ai';

export default {
	name: 'user',
	title: 'User',
	type: 'document',
	icon: AiOutlineUser,
	fields: [
		{
			name: 'firstName',
			title: 'First Name',
			type: 'string',
		},
		{
			name: 'lastName',
			title: 'Last Name',
			type: 'string',
		},
		{
			name: 'email',
			title: 'Email',
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
			title: 'firstName',
			firstName: 'firstName',
			lastName: 'lastName',
			subtitle: 'email',
		},
		prepare({ firstName = '', lastName = '', subtitle }) {
			const title = `${firstName} ${lastName}`.trim();
			return {
				title: title || '(missing first/last name)',
				subtitle: subtitle || '(missing email)',
			};
		},
	},
};
