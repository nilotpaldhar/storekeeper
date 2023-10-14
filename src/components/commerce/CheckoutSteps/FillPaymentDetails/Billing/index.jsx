import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '@store/slices/checkout/checkout.selectors';
import { fillDetails } from '@store/slices/checkoutSteps';
import { selectDetails } from '@store/slices/checkoutSteps/checkoutSteps.selectors';

import Checkbox from '@ui/data-entry/Checkbox';
import AddressForm from '@ui/commerce/AddressForm';
import BillingPreview from './Preview';

/**
 * Render the Billing component.
 *
 * @return {Element} The Billing component.
 */
const Billing = ({ onChange }) => {
	const dispatch = useDispatch();

	const tokenId = useSelector(selectToken);
	const shippingAddress = useSelector(selectDetails)?.shipping;
	const selectedBilling = useSelector(selectDetails)?.billing;

	const [preview, setPreview] = useState(false);
	const [billingAddress, setBillingAddress] = useState(null);
	const [shippingAsBilling, setShippingAsBilling] = useState(true);

	const handleSubmit = (data) => {
		setBillingAddress(data);
		dispatch(fillDetails({ billing: data }));
		setPreview(true);
	};

	useEffect(() => {
		if (shippingAsBilling) {
			dispatch(fillDetails({ billing: shippingAddress }));
		} else {
			dispatch(fillDetails({ billing: null }));
		}
	}, [shippingAsBilling, shippingAddress, dispatch]);

	useEffect(() => {
		onChange({ preview, shippingAsBilling });
	}, [preview, shippingAsBilling, onChange]);

	return (
		<div>
			{preview && !shippingAsBilling ? (
				<BillingPreview data={selectedBilling} onEdit={() => setPreview(false)} />
			) : (
				<div className="flex flex-col space-y-6">
					<Checkbox
						id="shippingAsBilling"
						name="shippingAsBilling"
						checked={shippingAsBilling}
						onCheckedChange={setShippingAsBilling}
						label="Use shipping address as billing address"
					/>
					{!shippingAsBilling && (
						<AddressForm
							addressType="billing"
							isCheckout
							tokenId={tokenId}
							submitBtnProps={{ fullWidth: true }}
							submitBtnText="Save and Continue"
							onSubmit={handleSubmit}
							defaultValues={{
								region: '',
								country: '',
								fullname: billingAddress?.fullname ?? '',
								street1: billingAddress?.street1 ?? '',
								street2: billingAddress?.street2 ?? '',
								city: billingAddress?.city ?? '',
								zip: billingAddress?.zip ?? '',
								notes: billingAddress?.notes ?? '',
								defaultBilling: billingAddress?.defaultBilling ?? false,
							}}
						/>
					)}
				</div>
			)}
		</div>
	);
};

/**
 * Default Props.
 */
Billing.defaultProps = {
	onChange: () => {},
};

/**
 * Prop Types.
 */
Billing.propTypes = {
	onChange: PropTypes.func,
};

export default Billing;
