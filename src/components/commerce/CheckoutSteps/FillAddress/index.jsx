import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectUser } from '@store/slices/user/user.selectors';

import { HTTP_STATUS } from '@constants';
import LoadingUI from '@ui/feedback/LoadingUI';

import AddressForm from './Form';
import AddressDetails from './Details';
import AddressPreview from './Preview';

/**
 * Render the FillAddress component.
 *
 * @return {Element} The FillAddress component.
 */
const FillAddress = ({ completed, onSubmit }) => {
	const user = useSelector(selectUser);

	const { status, authStatus } = user || {};
	const authenticated = authStatus === 'authenticated';
	const loading = status === HTTP_STATUS.pending;

	return (
		<div>
			{completed ? (
				<AddressPreview />
			) : (
				<LoadingUI loading={loading} height={300}>
					{authenticated ? (
						<AddressDetails onSubmit={onSubmit} />
					) : (
						<AddressForm onSubmit={onSubmit} />
					)}
				</LoadingUI>
			)}
		</div>
	);
};

/**
 * Default Props.
 */
FillAddress.defaultProps = {
	completed: false,
	onSubmit: () => {},
};

/**
 * Prop Types.
 */
FillAddress.propTypes = {
	completed: PropTypes.bool,
	onSubmit: PropTypes.func,
};

export default FillAddress;
