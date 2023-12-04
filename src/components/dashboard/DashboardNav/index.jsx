import PropTypes from 'prop-types';
import MenuLink from '@ui/dashboard/DashboardNav/MenuLink';
import { clsx } from 'clsx';

/**
 * Render the DashboardNav component.
 *
 * @return {Element} The DashboardNav component.
 */
const DashboardNav = ({ menus, ...props }) => (
	<nav {...props}>
		{menus?.map((menu, index) => (
			<ul
				key={menu?.id}
				className={clsx('py-5', index + 1 < menus?.length && 'border-b border-b-neutral-100')}
			>
				{menu?.title && (
					<li className="block text-xs font-light uppercase text-neutral-500">{menu?.title}</li>
				)}
				{menu?.links?.length > 0 && (
					<li className={clsx(menu?.title && 'pt-3')}>
						<ul className="flex flex-col space-y-2">
							{menu?.links?.map((link) => (
								<li key={link?.id}>
									<MenuLink href={link?.href}>{link?.label}</MenuLink>
								</li>
							))}
						</ul>
					</li>
				)}
			</ul>
		))}
	</nav>
);

/**
 * Default Props.
 */
DashboardNav.defaultProps = {
	menus: [],
};

/**
 * Prop Types.
 */
DashboardNav.propTypes = {
	menus: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			title: PropTypes.string,
			links: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string,
					label: PropTypes.string,
					href: PropTypes.string,
				})
			),
		})
	),
};

export default DashboardNav;
