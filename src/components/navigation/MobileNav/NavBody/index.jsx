import PropTypes from 'prop-types';

/** Components. */
import Logo from '@ui/data-display/Logo';
import NavMenu from '@ui/navigation/MobileNav/NavMenu';
import NavDivider from '@ui/navigation/MobileNav/NavDivider';

/** Icons. */
import LockIcon from '@icons/regular/Lock';
import CloseIcon from '@icons/regular/Close';

/**
 * Render the NavBody component.
 *
 * @return {Element} The NavBody component.
 */
const NavBody = ({ logo, menus, onClose, ...props }) => (
	<div {...props}>
		<div className="flex items-center justify-between px-5 pt-4">
			<Logo href="/" src={logo?.src} alt={logo?.alt} className="" />
			<button
				type="button"
				onClick={onClose}
				className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-50 text-neutral-900 hover:text-current hover:bg-neutral-100"
			>
				<CloseIcon className="!text-sm" />
			</button>
		</div>
		<NavDivider className="mt-4 mb-6" />
		<div className="px-5">
			<div className="flex flex-col space-y-2">
				<h4 className="text-base font-semibold leading-none">Welcome</h4>
				<p className="text-sm font-light leading-none">To access your account & manage orders</p>
			</div>
			<button
				type="button"
				className="flex items-center justify-center w-full py-3 mt-3 space-x-2 text-center text-white bg-primary-600 hover:bg-primary-500 hover:text-white"
			>
				<LockIcon className="!text-sm" />
				<span className="text-sm leading-none">Login / Register</span>
			</button>
		</div>
		<NavDivider className="mt-6 mb-4" />
		<NavMenu items={menus} />
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
