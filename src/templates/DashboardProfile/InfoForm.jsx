import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import useToggle from '@hooks/useToggle';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { infoValidator } from '@libs/validation/user';

import RegularButton from '@ui/buttons/RegularButton';
import RHFTextField from '@ui/data-entry/RHF/RHFTextField';
import DashboardHeading from '@ui/dashboard/DashboardHeading';

import EditIcon from '@icons/regular/Edit';
import CloseIcon from '@icons/regular/Close';

/**
 * Render the InfoForm component.
 *
 * @return {Element} The InfoForm component.
 */
const InfoForm = ({ firstname, lastname, phone, onInit, onSuccess, onFail }) => {
	const [edit, toggleEdit] = useToggle(false);
	const [loading, setLoading] = useState(false);

	/** Default Values */
	const defaultValues = {
		firstname: firstname ?? '',
		lastname: lastname ?? '',
		phone: phone ?? '',
	};

	const methods = useForm({
		defaultValues,
		resolver: yupResolver(infoValidator),
	});

	const onSubmit = async (data) => {
		setLoading(true);
		onInit(data);

		try {
			const res = await axios.patch('/api/user/update/info', data);
			const user = res?.data?.data;
			toggleEdit(false);
			onSuccess({ success: true, user });
		} catch (error) {
			const msg = error?.response?.data?.error;
			onFail({ error: true, message: msg });
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col space-y-6">
			<div className="flex flex-wrap items-center justify-between lg:gap-x-10 lg:justify-start">
				<DashboardHeading className="shrink-0">Personal Information</DashboardHeading>
				<RegularButton
					intent="primary-ghost"
					onClick={toggleEdit}
					startIcon={edit ? CloseIcon : EditIcon}
					disabled={
						!!methods.formState.errors?.firstname?.message ||
						!!methods.formState.errors?.lastname?.message ||
						!!methods.formState.errors?.phone?.message ||
						loading
					}
				>
					{edit ? 'Cancel' : 'Edit'}
				</RegularButton>
			</div>

			<div>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<div className="flex flex-col space-y-4">
							<div className="flex items-start space-x-4">
								<RHFTextField
									type="text"
									id="firstname"
									name="firstname"
									label="First Name"
									readOnly={!edit}
									disabled={loading}
									required
								/>
								<RHFTextField
									type="text"
									id="lastname"
									name="lastname"
									label="Last Name"
									readOnly={!edit}
									disabled={loading}
									required
								/>
							</div>
							<RHFTextField
								type="tel"
								id="phone"
								name="phone"
								label="Phone Number"
								readOnly={!edit}
								disabled={loading}
								required
							/>
							{edit && (
								<div className="lg:max-w-[196px]">
									<RegularButton type="submit" fullWidth loading={loading}>
										Save
									</RegularButton>
								</div>
							)}
						</div>
					</form>
				</FormProvider>
			</div>
		</div>
	);
};

/**
 * Default Props.
 */
InfoForm.defaultProps = {
	firstname: '',
	lastname: '',
	phone: '',
	onInit: () => {},
	onSuccess: () => {},
	onFail: () => {},
};

/**
 * Prop Types.
 */
InfoForm.propTypes = {
	firstname: PropTypes.string,
	lastname: PropTypes.string,
	phone: PropTypes.string,
	onInit: PropTypes.func,
	onSuccess: PropTypes.func,
	onFail: PropTypes.func,
};

export default InfoForm;
