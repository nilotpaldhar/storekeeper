import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { HTTP_STATUS } from '@constants';
import { useSelector, useDispatch } from 'react-redux';
import { selectToken } from '@store/slices/checkout/checkout.selectors';
import * as actions from '@store/slices/userAddress/userAddress.thunks';
import * as selectors from '@store/slices/userAddress/userAddress.selectors';

import Alert from '@ui/feedback/Alert';
import Radio from '@ui/data-entry/Radio';
import LoadingUI from '@ui/feedback/LoadingUI';
import RegularButton from '@ui/buttons/RegularButton';
import AddressForm from '@ui/commerce/AddressForm';
import AddressItem from '@ui/commerce/AddressList/AddressItem';

import PlusIcon from '@icons/regular/Plus';

/**
 * Render the AddressList component.
 *
 * @return {Element} The AddressList component.
 */
const AddressList = ({ addressType, defaultValue, isCheckout, onSelect, onUiStateChange }) => {
	const dispatch = useDispatch();

	const tokenId = useSelector(selectToken);
	const addresses = useSelector(selectors.selectCollection);
	const status = useSelector(selectors.selectStatus);
	const errMsg = useSelector(selectors.selectError);

	const [uiState, setUiState] = useState('DEFAULT');
	const [addressEdit, setAddressEdit] = useState({});
	const resetUiState = () => setUiState('DEFAULT');

	/** Fetch addresses on mount */
	useEffect(() => {
		if (status === HTTP_STATUS.idle) {
			dispatch(actions.fetchAddresses());
		}

		if (status === HTTP_STATUS.succeeded) {
			resetUiState();
		}
	}, [status, dispatch]);

	/** Set default address on initial render */
	useEffect(() => {
		onSelect(defaultValue);
	}, [defaultValue, onSelect]);

	useEffect(() => {
		onUiStateChange(uiState);
	}, [uiState, onUiStateChange]);

	return (
		<div>
			<LoadingUI loading={status === HTTP_STATUS.pending} height={400}>
				{errMsg && (
					<Alert type="error" closable className="mb-6">
						{errMsg}
					</Alert>
				)}

				{uiState === 'DEFAULT' && (
					<RegularButton
						fullWidth
						intent="dark-ghost"
						startIcon={PlusIcon}
						onClick={() => setUiState('NEW_ADDRESS')}
						className="!justify-start border border-neutral-200 border-dashed"
					>
						Add New Address
					</RegularButton>
				)}

				{addresses?.length > 0 && uiState === 'DEFAULT' && (
					<div className="flex flex-col space-y-4 mt-4">
						<Radio
							orientation="vertical"
							className="!max-w-full"
							defaultValue={defaultValue?.id}
							onValueChange={(val) => onSelect(addresses.find((a) => a?.id === val))}
						>
							{addresses?.map((address) => (
								<div key={address?.id} className="p-4 border border-neutral-100">
									<Radio.Item
										id={address?.id}
										value={address?.id}
										labelClassName="flex-1"
										parentClassName="!items-start"
										label={
											<AddressItem
												data={address}
												onEdit={(data) => {
													setAddressEdit(data);
													setUiState('EDIT_ADDRESS');
												}}
											/>
										}
									/>
								</div>
							))}
						</Radio>
					</div>
				)}

				{uiState === 'NEW_ADDRESS' && (
					<div>
						<AddressForm
							addressType={addressType}
							isCheckout={isCheckout}
							tokenId={isCheckout ? tokenId : null}
							onCancel={resetUiState}
							onSubmit={(address) => dispatch(actions.createAddress(address))}
						/>
					</div>
				)}

				{uiState === 'EDIT_ADDRESS' && (
					<div>
						<AddressForm
							addressType={addressType}
							isCheckout={isCheckout}
							tokenId={isCheckout ? tokenId : null}
							defaultValues={addressEdit}
							onCancel={resetUiState}
							onDelete={() => dispatch(actions.deleteAddress(addressEdit?.id))}
							onSubmit={(address) =>
								dispatch(actions.updateAddress({ addressId: addressEdit?.id, payload: address }))
							}
						/>
					</div>
				)}
			</LoadingUI>
		</div>
	);
};

/**
 * Default Props.
 */
AddressList.defaultProps = {
	addressType: 'shipping',
	defaultValue: null,
	isCheckout: false,
	onSelect: () => {},
	onUiStateChange: () => {},
};

/**
 * Prop Types.
 */
AddressList.propTypes = {
	addressType: PropTypes.oneOf(['shipping', 'billing']),
	defaultValue: PropTypes.shape({
		id: PropTypes.string,
	}),
	isCheckout: PropTypes.bool,
	onSelect: PropTypes.func,
	onUiStateChange: PropTypes.func,
};

export default AddressList;
