import PropTypes from 'prop-types';
import { signOut } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { selectUser } from '@store/slices/user/user.selectors';

import Alert from '@ui/feedback/Alert';
import RegularButton from '@ui/buttons/RegularButton';
import DashIcon from '@icons/regular/Dash';

/**
 * Render the UserDetails component.
 *
 * @return {Element} The UserDetails component.
 */
const UserDetails = ({ onSubmit }) => {
	const about = useSelector(selectUser)?.about;

	const handleClick = () => {
		onSubmit({
			customer: {
				id: about?.checId,
				firstname: about?.firstname ?? '',
				lastname: about?.lastname ?? '',
				email: about?.email,
				phone: about?.phone ?? '',
			},
		});
	};

	return (
		<div className="flex flex-col space-y-4">
			<div className="flex flex-col space-y-2 items-start">
				<div className="flex items-center space-x-4">
					<div className="w-10">Name</div>
					<div className="flex items-center">
						{(about?.firstname || about?.lastname) && (
							<div className="flex space-x-1 font-medium">
								{about?.firstname && <span>{about?.firstname}</span>}
								{about?.lastname && <span>{about?.lastname}</span>}
							</div>
						)}
						{!about?.firstname && !about?.lastname && <DashIcon />}
					</div>
				</div>
				<div className="flex items-center space-x-4">
					<div className="w-10">Email</div>
					<div className="flex items-center font-medium">{about?.email || <DashIcon />}</div>
				</div>
				<div className="flex items-center space-x-4">
					<div className="w-10">Phone</div>
					<div className="flex items-center font-medium">{about?.phone || <DashIcon />}</div>
				</div>
				<button
					type="button"
					className="block font-semibold"
					onClick={() => signOut({ callbackUrl: '/login' })}
				>
					Logout & Sign in to another account
				</button>
			</div>
			<RegularButton fullWidth onClick={handleClick}>
				Continue
			</RegularButton>
			<Alert type="info">
				<div className="flex flex-col space-y-1">
					<div className="font-semibold">Please Note</div>
					<div className="text-xs font-normal">
						Be aware that if you click &quot;Logout&ldquo;, you will need to start the checkout
						process again.
					</div>
				</div>
			</Alert>
		</div>
	);
};

/**
 * Default Props.
 */
UserDetails.defaultProps = {
	onSubmit: () => {},
};

/**
 * Prop Types.
 */
UserDetails.propTypes = {
	onSubmit: PropTypes.func,
};

export default UserDetails;
