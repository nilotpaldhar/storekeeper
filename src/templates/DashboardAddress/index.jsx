import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '@store/slices/userAddress/userAddress.thunks';
import * as selectors from '@store/slices/userAddress/userAddress.selectors';
import { HTTP_STATUS } from '@constants';

import Empty from '@ui/feedback/Empty';
import AddressBox from '@ui/dashboard/AddressBox';
import AddressForm from '@ui/commerce/AddressForm';
import RegularButton from '@ui/buttons/RegularButton';
import DashboardHeading from '@ui/dashboard/DashboardHeading';
import DashboardMHeader from '@ui/dashboard/DashboardMHeader';

import PlusIcon from '@icons/regular/Plus';
import ChevronDownIcon from '@icons/regular/ChevronDown';

/**
 * Render the DashboardAddressTmpl component.
 *
 * @return {Element} The DashboardAddressTmpl component.
 */
const DashboardAddressTmpl = () => {
	const dispatch = useDispatch();

	const status = useSelector(selectors.selectStatus);
	const addresses = useSelector(selectors.selectCollection);
	const pagination = useSelector(selectors.selectPagination);

	const [uiState, setUiState] = useState('DEFAULT');
	const [addressToEdit, setAddressToEdit] = useState({});

	const resetUiState = () => setUiState('DEFAULT');

	useEffect(() => {
		if (status === HTTP_STATUS.succeeded) {
			resetUiState();
		}
	}, [status, dispatch]);

	return (
		<>
			<DashboardMHeader href="/dashboard">Manage Addresses</DashboardMHeader>
			<>
				<div className="flex flex-wrap items-center justify-between gap-4">
					<DashboardHeading className="hidden md:block">Manage Addresses</DashboardHeading>
					<div className="flex-1 md:flex-initial">
						<RegularButton
							fullWidth
							intent="dark-ghost"
							startIcon={PlusIcon}
							onClick={() => setUiState('NEW_ADDRESS')}
							className="border border-neutral-200 border-dashed"
							disabled={uiState !== 'DEFAULT'}
						>
							Add New Address
						</RegularButton>
					</div>
				</div>

				{uiState === 'DEFAULT' && (
					<div className="mt-8">
						{status === HTTP_STATUS.succeeded && addresses.length > 0 ? (
							<>
								<ul className="flex flex-col space-y-4">
									{addresses?.map((address) => (
										<li key={address?.id}>
											<AddressBox
												data={address}
												editable
												onEdit={(addressToUpdate) => {
													setAddressToEdit(addressToUpdate);
													setUiState('EDIT_ADDRESS');
												}}
												onDelete={(addressIdToDelete) =>
													dispatch(actions.deleteAddress(addressIdToDelete))
												}
											/>
										</li>
									))}
								</ul>
								{pagination?.currentPage < pagination?.totalPages && (
									<div className="mt-8 lg:mt-12">
										<RegularButton
											fullWidth
											intent="primary-ghost"
											startIcon={ChevronDownIcon}
											onClick={() =>
												dispatch(actions.loadMoreAddresses(pagination.currentPage + 1))
											}
										>
											Load More
										</RegularButton>
									</div>
								)}
							</>
						) : (
							<Empty
								className="my-32"
								title="No result!"
								description="It appears that you haven't saved any address yet."
							/>
						)}
					</div>
				)}

				{uiState === 'NEW_ADDRESS' && (
					<div className="mt-8">
						<AddressForm
							onCancel={resetUiState}
							onSubmit={(address) => dispatch(actions.createAddress(address))}
						/>
					</div>
				)}

				{uiState === 'EDIT_ADDRESS' && (
					<div className="mt-8">
						<AddressForm
							defaultValues={addressToEdit}
							onCancel={resetUiState}
							onDelete={() => dispatch(actions.deleteAddress(addressToEdit?.id))}
							onSubmit={(address) =>
								dispatch(actions.updateAddress({ addressId: addressToEdit?.id, payload: address }))
							}
						/>
					</div>
				)}
			</>
		</>
	);
};

export default DashboardAddressTmpl;
