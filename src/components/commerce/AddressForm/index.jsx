import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';
import isFunction from 'lodash-es/isFunction';
import { clsx } from 'clsx';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import RegularButton from '@ui/buttons/RegularButton';
import RHFTextField from '@ui/data-entry/RHF/RHFTextField';
import RHFCheckbox from '@ui/data-entry/RHF/RHFCheckbox';
import TrashIcon from '@icons/regular/Trash';

import CountryField from './CountryField';
import RegionField from './RegionField';

/** Validation Schema. */
const schema = Yup.object({
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

/**
 * Render the AddressForm component.
 *
 * @return {Element} The AddressForm component.
 */
const AddressForm = ({
	addressType,
	defaultValues,
	resetFormFields,
	isCheckout,
	tokenId,
	cancelBtnText,
	cancelBtnProps,
	submitBtnText,
	submitBtnProps,
	className,
	btnWrapperClassName,
	onSubmit,
	onCancel,
	onDelete,
}) => {
	const methods = useForm({
		defaultValues,
		resolver: yupResolver(schema),
	});

	const { reset } = methods;

	/** Reset region field (if country changes) */
	const resetRegionField = useCallback(() => {
		methods.resetField('region');
	}, [methods]);

	/** Reset form */
	useEffect(() => {
		if (resetFormFields) reset();
	}, [reset, resetFormFields]);

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
				<div className={clsx('grid grid-cols-2 gap-4', className)}>
					<RHFTextField
						type="text"
						id="fullname"
						name="fullname"
						required
						label="Full Name"
						className="col-span-2"
					/>

					<RHFTextField
						type="text"
						id="street1"
						name="street1"
						required
						label="Street"
						className="col-span-2 sm:col-span-1"
					/>
					<RHFTextField
						type="text"
						id="street2"
						name="street2"
						label="Street Line 2"
						className="col-span-2 sm:col-span-1"
					/>

					<CountryField isCheckout={isCheckout} tokenId={tokenId} />
					<RegionField isCheckout={isCheckout} tokenId={tokenId} onFetch={resetRegionField} />

					<RHFTextField
						type="text"
						id="city"
						name="city"
						required
						label="City"
						className="col-span-2 sm:col-span-1"
					/>
					<RHFTextField
						type="text"
						id="zip"
						name="zip"
						required
						label="Postal / ZIP Code"
						className="col-span-2 sm:col-span-1"
					/>

					<RHFTextField
						type="textarea"
						id="notes"
						name="notes"
						label="Notes"
						className="col-span-2"
						rows={5}
					/>

					<RHFCheckbox
						id={addressType === 'billing' ? 'defaultBilling' : 'defaultShipping'}
						name={addressType === 'billing' ? 'defaultBilling' : 'defaultShipping'}
						className="col-span-2"
						label={`Default ${addressType} address`}
					/>

					<div className={clsx('flex flex-wrap justify-end gap-3 col-span-2', btnWrapperClassName)}>
						{onDelete && isFunction(onDelete) && (
							<RegularButton
								type="button"
								onClick={onDelete}
								startIcon={TrashIcon}
								intent="dark-ghost"
								aria-labelledby="delete address"
								className="border border-neutral-200"
							/>
						)}

						{onCancel && isFunction(onCancel) && (
							<RegularButton
								type="button"
								intent="dark-ghost"
								className="border border-neutral-200"
								onClick={() => {
									reset();
									onCancel();
								}}
								{...cancelBtnProps}
							>
								{cancelBtnText}
							</RegularButton>
						)}

						<RegularButton type="submit" {...submitBtnProps}>
							{submitBtnText}
						</RegularButton>
					</div>
				</div>
			</form>
		</FormProvider>
	);
};

/**
 * Default Props.
 */
AddressForm.defaultProps = {
	addressType: 'shipping',
	defaultValues: {
		fullname: '',
		street1: '',
		street2: '',
		country: '',
		region: '',
		city: '',
		zip: '',
		notes: '',
		defaultShipping: false,
		defaultBilling: false,
	},
	resetFormFields: false,
	tokenId: null,
	isCheckout: false,
	cancelBtnText: 'Cancel',
	cancelBtnProps: {},
	submitBtnText: 'Save',
	submitBtnProps: {},
	className: '',
	btnWrapperClassName: '',
	onSubmit: () => {},
	onCancel: null,
	onDelete: null,
};

/**
 * Prop Types.
 */
AddressForm.propTypes = {
	addressType: PropTypes.oneOf(['shipping', 'billing']),
	defaultValues: PropTypes.shape({
		fullname: PropTypes.string,
		street1: PropTypes.string,
		street2: PropTypes.string,
		country: PropTypes.string,
		region: PropTypes.string,
		city: PropTypes.string,
		zip: PropTypes.string,
		notes: PropTypes.string,
		defaultShipping: PropTypes.bool,
		defaultBilling: PropTypes.bool,
	}),
	resetFormFields: PropTypes.bool,
	tokenId: PropTypes.string,
	isCheckout: PropTypes.bool,
	cancelBtnText: PropTypes.node,
	cancelBtnProps: PropTypes.shape({}),
	submitBtnText: PropTypes.node,
	submitBtnProps: PropTypes.shape({}),
	className: PropTypes.string,
	btnWrapperClassName: PropTypes.string,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
	onDelete: PropTypes.func,
};

export default AddressForm;
