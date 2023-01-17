import PropTypes from 'prop-types';

/** Components. */
import Logo from '@ui/data-display/Logo';
import UserNavAction from '@ui/user/UserNavAction';
import NavMenu from '@ui/navigation/MobileNav/NavMenu';
import NavDivider from '@ui/navigation/MobileNav/NavDivider';

/** Icons. */
import CloseIcon from '@icons/regular/Close';

/**
 * Render the NavBody component.
 *
 * @return {Element} The NavBody component.
 */
const NavBody = ({ logo, menus, onClose, ...props }) => (
	<div {...props}>
		<div className="flex items-center justify-between px-5 pt-4">
			<Logo href="/" src={logo?.src} alt={logo?.alt} srcSanity />
			<button
				type="button"
				onClick={onClose}
				className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-50 text-neutral-900 hover:text-current hover:bg-neutral-100"
			>
				<CloseIcon className="!text-sm" />
				<span className="sr-only">Close Mobile Navigation Sidebar</span>
			</button>
		</div>
		<NavDivider className="mt-4 mb-6" />
		<div className="px-5">
			<UserNavAction />
		</div>
		<NavDivider className="mt-6 mb-4" />
		{menus && <NavMenu items={menus} />}
	</div>
);

/**
 * Default Props.
 */
NavBody.defaultProps = {
	logo: {},
	menus: [],
	onClose: () => {},
};

/**
 * Prop Types.
 */
NavBody.propTypes = {
	logo: PropTypes.shape({
		src: PropTypes.string,
		alt: PropTypes.string,
	}),
	menus: PropTypes.arrayOf(PropTypes.shape({})),
	onClose: PropTypes.func,
};

export default NavBody;
