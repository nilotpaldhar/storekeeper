import PropTypes from 'prop-types';

/** Icons. */
import MenuIcon from '@icons/regular/Menu';

/**
 * Render the NavTrigger component.
 *
 * @return {Element} The NavTrigger component.
 */
const NavTrigger = ({ onOpen, ...props }) => (
	<button type="button" onClick={onOpen} {...props}>
		<MenuIcon />
		<span className="sr-only">Open Menu</span>
	</button>
);

/**
 * Default Props.
 */
NavTrigger.defaultProps = {
	onOpen: () => {},
};

/**
 * Prop Types.
 */
NavTrigger.propTypes = {
	onOpen: PropTypes.func,
};

export default NavTrigger;
