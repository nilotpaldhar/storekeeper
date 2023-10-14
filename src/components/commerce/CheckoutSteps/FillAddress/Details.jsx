import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Alert from '@ui/feedback/Alert';
import BlockUI from '@ui/feedback/BlockUI';
import AddressList from '@ui/commerce/AddressList';
import RegularButton from '@ui/buttons/RegularButton';

import { useDispatch, useSelector } from 'react-redux';
import { fillContents } from '@store/slices/checkout';
import { selectToken } from '@store/slices/checkout/checkout.selectors';
import { selectDetails } from '@store/slices/checkoutSteps/checkoutSteps.selectors';
import { selectDefaultShipping } from '@store/slices/userAddress/userAddress.selectors';

import { addTaxZone } from '@libs/commerce/checkout/helpers';

/**
 * Render the AddressDetails component.
 *
 * @return {Element} The AddressDetails component.
 */
const AddressDetails = ({ onSubmit }) => {
	const dispatch = useDispatch();

	const tokenId = useSelector(selectToken);
	const defaultShipping = useSelector(selectDefaultShipping);
	const selectedShipping = useSelector(selectDetails)?.shipping;

	const [loading, setLoading] = useState(false);
	const [errMsg, setErrMsg] = useState(null);
	const [showSubmit, setShowSubmit] = useState(false);
	const [shippingAddress, setShippingAddress] = useState(null);

	const handleSelect = useCallback((data) => {
		setErrMsg(null);
		setShippingAddress(data);
	}, []);

	const handleUiChange = useCallback((ui) => {
		setShowSubmit(ui === 'DEFAULT');
	}, []);

	const handleSubmit = async () => {
		setErrMsg(null);

		if (!shippingAddress) {
			setErrMsg('Shipping address is required');
			return;
		}

		try {
			setLoading(true);
			const contents = await addTaxZone(tokenId, {
				region: shippingAddress?.region,
				country: shippingAddress?.country,
				zip: shippingAddress?.zip,
			});
			dispatch(fillContents(contents));
			onSubmit({ shipping: shippingAddress });
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
			<AddressList
				isCheckout
				addressType="shipping"
				defaultValue={selectedShipping || defaultShipping}
				onSelect={handleSelect}
				onUiStateChange={handleUiChange}
			/>
			{showSubmit && shippingAddress && (
				<div className="mt-4">
					<RegularButton fullWidth onClick={handleSubmit}>
						Continue
					</RegularButton>
				</div>
			)}
		</BlockUI>
	);
};

/**
 * Default Props.
 */
AddressDetails.defaultProps = {
	onSubmit: () => {},
};

/**
 * Prop Types.
 */
AddressDetails.propTypes = {
	onSubmit: PropTypes.func,
};

export default AddressDetails;
