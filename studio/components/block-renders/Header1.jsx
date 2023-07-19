import PropTypes from 'prop-types';

/**
 * Render the Header1 component.
 *
 * @return {Element} The Header1 component.
 */
const Header1 = ({ children }) => {
	const styles = {
		margin: '0',
		fontSize: '2rem',
		lineHeight: '1.5',
		fontWeight: 400,
	};

	return <h1 style={styles}>{children}</h1>;
};

/**
 * Default Props.
 */
Header1.defaultProps = {
	children: '',
};

Header1.propTypes = {
	children: PropTypes.node,
};

export default Header1;
