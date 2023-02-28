import { HTTP_STATUS } from '@constants';

/** Components. */
import DashIcon from '@icons/regular/Dash';
import LoadingUI from '@ui/feedback/LoadingUI';
import DashboardNavMenu from '@ui/dashboard/DashboardNav/DashboardNavMenu';

/** Hooks & Functions. */
import { signOut } from 'next-auth/react';
import { useSelector } from 'react-redux';
import menus from '@ui/dashboard/DashboardNav/menus';
import { selectUserStatus, selectUserAbout } from '@store/slices/user/user.selectors';

/**
 * Render the DashboardNav component.
 *
 * @return {Element} The DashboardNav component.
 */
const DashboardNav = () => {
	const status = useSelector(selectUserStatus);
	const user = useSelector(selectUserAbout);

	return (
		<aside className="border border-neutral-50 w-full">
			<div className="px-5 py-10 border-b border-neutral-50">
				<LoadingUI loading={status === HTTP_STATUS.pending && !user} height={120}>
					<div className="flex justify-center items-center w-14 h-14 mx-auto rounded-full border border-primary-600 text-primary-600">
						<span className="text-3xl font-bold leading-none select-none">
							{user?.firstname?.[0] || <>&#63;</>}
						</span>
					</div>
					<div className="flex flex-col space-y-1 text-center mt-4">
						<h1 className="flex items-center justify-center space-x-1 text-sm font-semibold uppercase leading-normal tracking-wider">
							{user?.firstname && <span>{user?.firstname}</span>}
							{user?.lastname && <span>{user?.lastname}</span>}
							{!user?.firstname && !user?.lastname && <DashIcon />}
						</h1>
						{user?.email && (
							<p className="flex items-center justify-center space-x-px text-xs font-light text-neutral-500 text-center">
								<span>&#40;</span>
								<span>{user?.email}</span>
								<span>&#41;</span>
							</p>
						)}
					</div>
				</LoadingUI>
			</div>
			<nav>
				<ul>
					{menus?.map((menu) => (
						<li key={menu.id} className="border-b border-neutral-50">
							<DashboardNavMenu href={menu?.href}>{menu.label}</DashboardNavMenu>
						</li>
					))}
					<li>
						<DashboardNavMenu onClick={() => signOut({ callbackUrl: '/login' })}>
							Logout
						</DashboardNavMenu>
					</li>
				</ul>
			</nav>
		</aside>
	);
};

/**
 * Default Props.
 */
DashboardNav.defaultProps = {};

/**
 * Prop Types.
 */
DashboardNav.propTypes = {};

export default DashboardNav;
