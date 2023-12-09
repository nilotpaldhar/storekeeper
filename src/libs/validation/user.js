import * as Yup from 'yup';

export const infoValidator = Yup.object({
	firstname: Yup.string().required('First name is required'),
	lastname: Yup.string().required('Last name is required'),
	phone: Yup.string().required('Phone number is required'),
});

export const emailValidator = Yup.object({
	email: Yup.string().email('Invalid email').required('Email is required'),
});

export const addressValidator = Yup.object({
	fullname: Yup.string().required('Full name is required'),
	street1: Yup.string().required('Street address is required'),
	street2: Yup.string(),
	country: Yup.string().required('Country is required'),
	region: Yup.string().required('State is required'),
	city: Yup.string().required('City is required'),
	zip: Yup.string().required('ZIP code is required'),
	notes: Yup.string(),
	defaultShipping: Yup.boolean().notRequired(),
	defaultBilling: Yup.boolean().notRequired(),
});
