import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import useToggle from '@hooks/useToggle';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailValidator } from '@libs/validation/user';

import RegularButton from '@ui/buttons/RegularButton';
import RHFTextField from '@ui/data-entry/RHF/RHFTextField';
import DashboardHeading from '@ui/dashboard/DashboardHeading';

import EditIcon from '@icons/regular/Edit';
import CloseIcon from '@icons/regular/Close';

/**
 * Render the EmailForm component.
 *
 * @return {Element} The EmailForm component.
 */
const EmailForm = ({ email, onInit, onSuccess, onFail }) => {
	const [edit, toggleEdit] = useToggle(false);
	const [loading, setLoading] = useState(false);

	const methods = useForm({
		defaultValues: { email: email ?? '' },
		resolver: yupResolver(emailValidator),
	});

	const onSubmit = async (data) => {
		setLoading(true);
		onInit(data);

		try {
			const res = await axios.patch('/api/user/update/email', data);
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
				<DashboardHeading>Email Address</DashboardHeading>
				<RegularButton
					intent="primary-ghost"
					onClick={toggleEdit}
					startIcon={edit ? CloseIcon : EditIcon}
					disabled={!!methods.formState.errors?.email?.message || loading}
				>
					{edit ? 'Cancel' : 'Edit'}
				</RegularButton>
			</div>
			<div>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<div className="flex flex-col space-y-4 md:flex-row md:items-start md:space-x-4 md:space-y-0">
							<div className="min-w-full md:min-w-[320px]">
								<RHFTextField
									type="email"
									id="email"
									name="email"
									required
									readOnly={!edit}
									disabled={loading}
								/>
							</div>
							{edit && (
								<div className="flex-1 lg:max-w-[196px]">
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
EmailForm.defaultProps = {
	email: null,
	onInit: () => {},
	onSuccess: () => {},
	onFail: () => {},
};

/**
 * Prop Types.
 */
EmailForm.propTypes = {
	email: PropTypes.string,
	onInit: PropTypes.func,
	onSuccess: PropTypes.func,
	onFail: PropTypes.func,
};

export default EmailForm;
