import PropTypes from 'prop-types';

/**
 * Render the Header2 component.
 *
 * @return {Element} The Header2 component.
 */
const Header2 = ({ children }) => {
	const styles = {
		margin: '0',
		fontSize: '1.75rem',
		lineHeight: '1.375',
		fontWeight: 400,
	};

	return <h2 style={styles}>{children}</h2>;
};

/**
 * Default Props.
 */
Header2.defaultProps = {
	children: '',
};

Header2.propTypes = {
	children: PropTypes.node,
};

export default Header2;
