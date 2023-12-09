import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { DASHBOARD_MENUS } from '@constants';
import { selectUserAbout } from '@store/slices/user/user.selectors';

import Container from '@ui/general/Container';
import PrimaryLayout from '@ui/layouts/PrimaryLayout';
import DashboardNav from '@ui/dashboard/DashboardNav';

/**
 * Render the DashboardLayout component.
 *
 * @return {Element} The DashboardLayout component.
 */
const DashboardLayout = ({ data, children, ...props }) => {
	const user = useSelector(selectUserAbout);

	return (
		<PrimaryLayout data={data} {...props}>
			<div className="max-w-4xl mx-auto py-10 lg:py-14">
				<Container>
					<div className="hidden md:block w-full pb-4 border-b border-neutral-100">
						<div className="flex flex-col space-y-1 text-neutral-900">
							<h1 className="text-lg font-bold leading-snug">Account</h1>
							<p className="flex items-center space-x-1 text-xs font-light">
								{user?.firstname && <span>{user?.firstname}</span>}
								{user?.lastname && <span>{user?.lastname}</span>}
								{!user?.firstname && !user?.lastname && <span>Unknown</span>}
							</p>
						</div>
					</div>
					<div className="md:flex md:items-start">
						<aside className="hidden md:block shrink-0 w-full max-w-[200px] border-r border-neutral-100 pr-6">
							<DashboardNav menus={DASHBOARD_MENUS} />
						</aside>
						<main className="md:flex-1 md:p-4">{children}</main>
					</div>
				</Container>
			</div>
		</PrimaryLayout>
	);
};

/**
 * Default Props.
 */
DashboardLayout.defaultProps = {
	children: '',
};

/**
 * Prop Types.
 */
DashboardLayout.propTypes = {
	data: PropTypes.shape({
		header: PropTypes.shape({}),
		footer: PropTypes.shape({}),
	}).isRequired,
	children: PropTypes.node,
};

export default DashboardLayout;
