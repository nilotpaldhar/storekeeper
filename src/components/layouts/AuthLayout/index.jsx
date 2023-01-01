import PropTypes from 'prop-types';

/**
 * Render the AuthLayout component.
 *
 * @return {Element} The AuthLayout component.
 */
const AuthLayout = ({ children }) => (
	<div>
		<nav className="bg-neutral-50 text-red-600 font-bold py-4 w-full">Auth Layout</nav>
		<div>{children}</div>
	</div>
);

/**
 * Default Props.
 */
AuthLayout.defaultProps = {
	children: '',
};

/**
 * Prop Types.
 */
AuthLayout.propTypes = {
	children: PropTypes.node,
};

export default AuthLayout;
