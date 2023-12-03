import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { fillUser } from '@store/slices/user';

/** Components. */
import LoadingUI from '@ui/feedback/LoadingUI';
import RegularButton from '@ui/buttons/RegularButton';

/** Icons. */
import LockIcon from '@icons/regular/Lock';
import DashboardIcon from '@icons/regular/Dashboard';

/**
 * Render the UserNavAction component.
 *
 * @return {Element} The UserNavAction component.
 */
const UserNavAction = ({ ...props }) => {
	const dispatch = useDispatch();
	const { status, data } = useSession();

	const loading = status === 'loading';
	const authenticated = status === 'authenticated';
	const about = data?.user;

	/** Fill authenticated user data. */
	useEffect(() => {
		dispatch(fillUser({ status, user: data?.user }));
	}, [dispatch, status, data?.user]);

	return (
		<div {...props}>
			<LoadingUI loading={loading} height={80}>
				<div className="flex flex-col space-y-3">
					<div className="flex flex-col space-y-2">
						<h4 className="text-sm font-semibold leading-none">
							<span>{authenticated ? 'Hello' : 'Welcome'}</span>
							{authenticated && (
								<span className="inline-block ml-1">
									{about?.firstname && <span>{about?.firstname}</span>}
									{about?.lastname && <span className="ml-1">{about?.lastname}</span>}
								</span>
							)}
						</h4>
						<p className="text-xs font-light leading-none">
							{authenticated ? (
								<span className="font-semibold">{about?.email}</span>
							) : (
								<span>To access your account & manage orders</span>
							)}
						</p>
					</div>
					{authenticated ? (
						<RegularButton href="/dashboard" as="anchor" startIcon={DashboardIcon}>
							Dashboard
						</RegularButton>
					) : (
						<RegularButton href="/login" as="anchor" fullWidth startIcon={LockIcon}>
							Login / Register
						</RegularButton>
					)}
				</div>
			</LoadingUI>
		</div>
	);
};

export default UserNavAction;
