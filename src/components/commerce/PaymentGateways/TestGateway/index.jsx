import PropTypes from 'prop-types';
import { IMask } from 'react-imask';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '@ui/commerce/PaymentGateways/TestGateway/validation';

import { useSelector } from 'react-redux';
import { selectDetails } from '@store/slices/checkoutSteps/checkoutSteps.selectors';

import TextField from '@ui/data-entry/TextField';
import TextFieldMasked from '@ui/data-entry/TextField/Masked';
import RegularButton from '@ui/buttons/RegularButton';
import LockIcon from '@icons/regular/Lock';

/**
 * Render the TestGateway component.
 *
 * @return {Element} The TestGateway component.
 */
const TestGateway = ({ onComplete }) => {
	const zipCode = useSelector(selectDetails)?.shipping?.zip;

	const defaultValues = {
		holderName: '',
		cardNumber: '',
		expiry: '',
		cvvNumber: '',
	};

	/** Get current year for card expiry */
	const getCurrentYear = () => {
		if (typeof window !== 'undefined') {
			return new Date().getFullYear();
		}
		return 2023;
	};

	const {
		handleSubmit,
		control,
		register,
		formState: { errors },
	} = useForm({
		defaultValues,
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		const { holderName, cardNumber, expiry, cvvNumber } = data ?? {};
		const [expMonth, expYear] = expiry?.split('/') ?? [];

		onComplete({
			payment: {
				gateway: 'test_gateway',
				card: {
					name: holderName,
					number: cardNumber,
					expiry_month: expMonth,
					expiry_year: expYear,
					cvc: cvvNumber,
					postal_zip_code: zipCode,
				},
			},
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate>
			<div className="grid grid-cols-2 gap-4">
				<TextField
					required
					id="holderName"
					label="Name on card"
					placeholder="John Doe"
					className="col-span-2"
					{...register('holderName')}
					error={errors?.holderName?.message}
				/>

				<Controller
					name="cardNumber"
					control={control}
					render={({ field }) => (
						<TextFieldMasked
							{...field}
							mask="0000 0000 0000 0000"
							required
							id={field.name}
							name={field.name}
							label="Card Number"
							placeholder="0000 0000 0000 0000"
							className="col-span-2"
							error={errors?.cardNumber?.message}
						/>
					)}
				/>

				<Controller
					name="expiry"
					control={control}
					render={({ field }) => (
						<TextFieldMasked
							{...field}
							mask="MM/YYYY"
							maskBlocks={{
								MM: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2, autofix: 'pad' },
								YYYY: {
									mask: IMask.MaskedRange,
									from: getCurrentYear(),
									to: 2999,
									maxLength: 4,
									autofix: 'pad',
								},
							}}
							required
							id={field.name}
							name={field.name}
							label="Expiry Date"
							placeholder="MM/YYYY"
							error={errors?.expiry?.message}
							unmask={false}
						/>
					)}
				/>

				<Controller
					name="cvvNumber"
					control={control}
					render={({ field }) => (
						<TextFieldMasked
							{...field}
							mask="0000"
							required
							id={field.name}
							name={field.name}
							label="CVV / CVC"
							placeholder="000"
							error={errors?.cvvNumber?.message}
						/>
					)}
				/>

				<RegularButton type="submit" fullWidth startIcon={LockIcon} className="col-span-2">
					Pay
				</RegularButton>
			</div>
		</form>
	);
};

/**
 * Default Props.
 */
TestGateway.defaultProps = {
	onComplete: () => {},
};

/**
 * Prop Types.
 */
TestGateway.propTypes = {
	onComplete: PropTypes.func,
};

export default TestGateway;
