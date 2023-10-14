import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectDetails } from '@store/slices/checkoutSteps/checkoutSteps.selectors';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import RegularButton from '@ui/buttons/RegularButton';
import RHFTextField from '@ui/data-entry/RHF/RHFTextField';

/** Validation schema */
const schema = Yup.object({
	firstname: Yup.string().required('First name is required'),
	lastname: Yup.string().required('Last name is required'),
	email: Yup.string().email('Invalid email').required('Email is required'),
	phone: Yup.string().required('Phone number is required'),
});

/**
 * Render the UserForm component.
 *
 * @return {Element} The UserForm component.
 */
const UserForm = ({ onSubmit }) => {
	const details = useSelector(selectDetails)?.customer;

	/** Default Values */
	const defaultValues = {
		firstname: details?.firstname ?? '',
		lastname: details?.lastname ?? '',
		email: details?.email ?? '',
		phone: details?.phone ?? '',
	};

	const methods = useForm({
		defaultValues,
		resolver: yupResolver(schema),
	});

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit((data) => onSubmit({ customer: { ...data } }))}
				noValidate
			>
				<div className="grid grid-cols-2 gap-4">
					<RHFTextField type="text" id="firstname" name="firstname" required label="First Name" />
					<RHFTextField type="text" id="lastname" name="lastname" required label="Last Name" />
					<RHFTextField
						type="text"
						id="email"
						name="email"
						required
						label="Email"
						className="col-span-2"
					/>
					<RHFTextField
						type="tel"
						id="phone"
						name="phone"
						required
						label="Phone Number"
						className="col-span-2"
					/>
					<RegularButton type="submit" fullWidth className="col-span-2">
						Continue
					</RegularButton>
				</div>
			</form>
		</FormProvider>
	);
};

/**
 * Default Props.
 */
UserForm.defaultProps = {
	onSubmit: () => {},
};

/**
 * Prop Types.
 */
UserForm.propTypes = {
	onSubmit: PropTypes.func,
};

export default UserForm;
