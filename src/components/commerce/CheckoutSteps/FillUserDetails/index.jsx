import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectUser } from '@store/slices/user/user.selectors';

import { HTTP_STATUS } from '@constants';
import LoadingUI from '@ui/feedback/LoadingUI';

import UserForm from './Form';
import UserDetails from './Details';
import UserPreview from './Preview';

/**
 * Render the FillUserDetails component.
 *
 * @return {Element} The FillUserDetails component.
 */
const FillUserDetails = ({ completed, onSubmit }) => {
	const user = useSelector(selectUser);

	const { status, authStatus } = user || {};
	const authenticated = authStatus === 'authenticated';
	const loading = status === HTTP_STATUS.pending;

	return (
		<div>
			{completed ? (
				<UserPreview />
			) : (
				<LoadingUI loading={loading} height={300}>
					{authenticated ? <UserDetails onSubmit={onSubmit} /> : <UserForm onSubmit={onSubmit} />}
				</LoadingUI>
			)}
		</div>
	);
};

/**
 * Default Props.
 */
FillUserDetails.defaultProps = {
	completed: false,
	onSubmit: () => {},
};

/**
 * Prop Types.
 */
FillUserDetails.propTypes = {
	completed: PropTypes.bool,
	onSubmit: PropTypes.func,
};

export default FillUserDetails;
