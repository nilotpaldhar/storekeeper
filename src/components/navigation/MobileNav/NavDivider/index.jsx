import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * Render the MobileNav component.
 *
 * @return {Element} The MobileNav component.
 */
const NavDivider = ({ className, ...props }) => (
	<hr className={clsx('my-6 border-neutral-100', className)} {...props} />
);

/**
 * Default Props.
 */
NavDivider.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
NavDivider.propTypes = {
	className: PropTypes.string,
};

export default NavDivider;
