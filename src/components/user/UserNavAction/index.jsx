import { useSession } from 'next-auth/react';

/** Components. */
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
	const { status, data } = useSession();
	const isAuthenticated = status === 'authenticated';
	const userName = data?.user?.name || 'user';
	const userEmail = data?.user?.email;

	return (
		<div className="flex flex-col space-y-3" {...props}>
			<div className="flex flex-col space-y-2">
				<h4 className="text-sm font-semibold leading-none">
					<span>{isAuthenticated ? 'Hello' : 'Welcome'}</span>
					{isAuthenticated && <span className="ml-1 inline-block">{userName}</span>}
				</h4>
				<p className="text-xs font-light leading-none">
					{isAuthenticated && userEmail ? (
						<span className="font-semibold">{userEmail}</span>
					) : (
						<span>To access your account & manage orders</span>
					)}
				</p>
			</div>
			{isAuthenticated ? (
				<RegularButton href="/dashboard" as="anchor" startIcon={DashboardIcon}>
					Dashboard
				</RegularButton>
			) : (
				<RegularButton href="/login" as="anchor" fullWidth startIcon={LockIcon}>
					Login / Register
				</RegularButton>
			)}
		</div>
	);
};

export default UserNavAction;
