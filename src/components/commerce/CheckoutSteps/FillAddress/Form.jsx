import PropTypes from 'prop-types';
import { useState } from 'react';

import Alert from '@ui/feedback/Alert';
import BlockUI from '@ui/feedback/BlockUI';
import AddressForm from '@ui/commerce/AddressForm';

import { useDispatch, useSelector } from 'react-redux';
import { fillContents } from '@store/slices/checkout';
import { selectToken } from '@store/slices/checkout/checkout.selectors';
import { selectDetails } from '@store/slices/checkoutSteps/checkoutSteps.selectors';

import { addTaxZone } from '@libs/commerce/checkout/helpers';

/**
 * Render the CheckoutAddressForm component.
 *
 * @return {Element} The CheckoutAddressForm component.
 */
const CheckoutAddressForm = ({ onSubmit }) => {
	const dispatch = useDispatch();

	const tokenId = useSelector(selectToken);
	const shipping = useSelector(selectDetails)?.shipping;

	const [loading, setLoading] = useState(false);
	const [errMsg, setErrMsg] = useState(null);

	const handleSubmit = async (data) => {
		setLoading(true);
		setErrMsg(null);

		try {
			const contents = await addTaxZone(tokenId, {
				region: data?.region,
				country: data?.country,
				zip: data?.zip,
			});
			dispatch(fillContents(contents));
			onSubmit({ shipping: data });
		} catch (error) {
			setErrMsg(error?.response?.data?.error ?? 'Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	return (
		<BlockUI blocking={loading}>
			{errMsg && (
				<Alert type="error" className="mb-6" closable>
					{errMsg}
				</Alert>
			)}
			<AddressForm
				isCheckout
				tokenId={tokenId}
				submitBtnText="Continue"
				submitBtnProps={{ fullWidth: true }}
				onSubmit={handleSubmit}
				defaultValues={{
					fullname: shipping?.fullname ?? '',
					street1: shipping?.street1 ?? '',
					street2: shipping?.street2 ?? '',
					country: '',
					region: '',
					city: shipping?.city ?? '',
					zip: shipping?.zip ?? '',
					notes: shipping?.notes ?? '',
					defaultShipping: shipping?.defaultShipping ?? false,
				}}
			/>
		</BlockUI>
	);
};

/**
 * Default Props.
 */
CheckoutAddressForm.defaultProps = {
	onSubmit: () => {},
};

/**
 * Prop Types.
 */
CheckoutAddressForm.propTypes = {
	onSubmit: PropTypes.func,
};

export default CheckoutAddressForm;
