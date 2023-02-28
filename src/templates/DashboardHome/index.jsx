import { signOut } from 'next-auth/react';
import UserIcon from '@icons/regular/User';
import LogoutIcon from '@icons/regular/Logout';
import DashboardLink from '@templates/DashboardHome/DashboardLink';

/**
 * Render the DashboardHomeTmpl component.
 *
 * @return {Element} The DashboardHomeTmpl component.
 */
const DashboardHomeTmpl = () => (
	<main className="">
		<h1 className="text-base lg:text-lg font-semibold uppercase leading-normal mb-8">
			Dashboard Overview
		</h1>
		<section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
			<DashboardLink href="/dashboard/account" icon={UserIcon}>
				Account Details
			</DashboardLink>
			<DashboardLink icon={LogoutIcon} onClick={() => signOut({ callbackUrl: '/login' })}>
				Logout
			</DashboardLink>

			{/* TODO */}
			{/* <DashboardLink href="/" icon={OrderedListIcon}>
				Your Orders
			</DashboardLink>
			<DashboardLink href="/" icon={MapPinIcon}>
				Address
			</DashboardLink>
			<DashboardLink href="/" icon={HeartIcon}>
				Wishlist
			</DashboardLink> */}
		</section>
	</main>
);

export default DashboardHomeTmpl;
