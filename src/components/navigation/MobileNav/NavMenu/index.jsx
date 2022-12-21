import PropTypes from 'prop-types';
import SubMenu from '@ui/navigation/MobileNav/NavMenu/SubMenu';

/**
 * Render the NavMenu component.
 *
 * @return {Element} The NavMenu component.
 */
const NavMenu = ({ items, ...props }) => (
	<nav {...props}>
		{items?.length > 0 && (
			<ul className="flex flex-col space-y-1">
				{items?.map((item) => (
					<li key={item?.id}>
						<SubMenu data={item} collapsible={item?.type === 'navDropdown'} />
					</li>
				))}
			</ul>
		)}
	</nav>
);

/**
 * Default Props.
 */
NavMenu.defaultProps = {
	items: [],
};

/**
 * Prop Types.
 */
NavMenu.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({})),
};

export default NavMenu;
