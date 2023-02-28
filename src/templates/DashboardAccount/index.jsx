import PropTypes from 'prop-types';

/** Components. */
import LoadingUI from '@ui/feedback/LoadingUI';
import UserDetailsForm from '@ui/user/UserDetailsForm';

/** Hooks. */
import { useDispatch } from 'react-redux';
import { updateUser } from '@store/slices/user/user.thunks';

/**
 * Render the DashboardAccTmpl component.
 *
 * @return {Element} The DashboardAccTmpl component.
 */
const DashboardAccTmpl = ({ loading }) => {
	const dispatch = useDispatch();

	const handleUserUpdate = (data) => {
		dispatch(updateUser(data));
	};

	return (
		<main className="py-1">
			<h1 className="text-base lg:text-lg font-semibold uppercase leading-normal mb-8">
				Account Details
			</h1>
			<LoadingUI loading={loading} height={300}>
				<UserDetailsForm onSubmit={handleUserUpdate} />
			</LoadingUI>
		</main>
	);
};

/**
 * Default Props.
 */
DashboardAccTmpl.defaultProps = {
	loading: false,
};

/**
 * Prop Types.
 */
DashboardAccTmpl.propTypes = {
	loading: PropTypes.bool,
};

export default DashboardAccTmpl;
