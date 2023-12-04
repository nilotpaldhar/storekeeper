import { signOut } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { selectUserAbout } from '@store/slices/user/user.selectors';
import { DASHBOARD_OVERVIEW_LINKS } from '@constants';

import RegularButton from '@ui/buttons/RegularButton';
import DashboardMHeader from '@ui/dashboard/DashboardMHeader';
import DashboardLink from '@templates/DashboardHome/DashboardLink';

import BoxIcon from '@icons/regular/Box';
import UserIcon from '@icons/regular/User';
import HeartIcon from '@icons/regular/Heart';
import MapPinIcon from '@icons/regular/MapPin';

/**
 * Render the DashboardHomeTmpl component.
 *
 * @return {Element} The DashboardHomeTmpl component.
 */
const DashboardHomeTmpl = () => {
	const user = useSelector(selectUserAbout);

	const mapDashboardOverviewIcons = (id = '') => {
		const OverviewMap = {
			overview_orders: BoxIcon,
			overview_wishlist: HeartIcon,
			overview_addresses: MapPinIcon,
			overview_profile: UserIcon,
		};

		if (id in OverviewMap) {
			return OverviewMap[id];
		}

		return null;
	};

	return (
		<div className="max-w-lg">
			<DashboardMHeader href="/">
				<div className="flex items-center space-x-1">
					<span>Hey!</span>
					{user?.firstname && <span>{user?.firstname}</span>}
					{user?.lastname && <span>{user?.lastname}</span>}
					{!user?.firstname && !user?.lastname && <span>Stranger</span>}
				</div>
			</DashboardMHeader>
			<section className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-5">
				{DASHBOARD_OVERVIEW_LINKS.map((link) => (
					<div key={link?.id} className="lg:aspect-square">
						<DashboardLink
							href={link?.href}
							title={link?.title}
							description={link?.description}
							icon={mapDashboardOverviewIcons(link?.id)}
						/>
					</div>
				))}
			</section>
			<section className="pt-4 lg:max-w-[200px]">
				<RegularButton fullWidth onClick={() => signOut()}>
					Logout
				</RegularButton>
			</section>
		</div>
	);
};

export default DashboardHomeTmpl;
