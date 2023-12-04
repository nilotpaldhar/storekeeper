import * as Yup from 'yup';

export const infoValidator = Yup.object({
	firstname: Yup.string().required('First name is required'),
	lastname: Yup.string().required('Last name is required'),
	phone: Yup.string().required('Phone number is required'),
});

export const emailValidator = Yup.object({
	email: Yup.string().email('Invalid email').required('Email is required'),
});
