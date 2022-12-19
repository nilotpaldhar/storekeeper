import MenuIcon from '@icons/regular/Menu';

/**
 * Render the HeaderNavToggle component.
 *
 * @return {Element} The HeaderNavToggle component.
 */
const HeaderNavToggle = () => (
	<button
		type="button"
		className="flex items-center order-first p-2 mr-4 rounded xxl:hidden text-neutral-900 hover:text-current focus-visible:outline-primary-600 focus-visible:text-primary-600"
	>
		<MenuIcon className="!text-xl" />
	</button>
);

export default HeaderNavToggle;
