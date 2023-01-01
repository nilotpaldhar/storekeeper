// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Render the Header4 component.
 *
 * @return {Element} The Header4 component.
 */
const Header4 = ({ children }) => {
	const styles = {
		margin: '0',
		fontSize: '1.25rem',
		lineHeight: '1.25',
		fontWeight: 400,
	};

	return <h4 style={styles}>{children}</h4>;
};

/**
 * Default Props.
 */
Header4.defaultProps = {
	children: '',
};

Header4.propTypes = {
	children: PropTypes.node,
};

export default Header4;
