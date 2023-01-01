// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Render the Header3 component.
 *
 * @return {Element} The Header3 component.
 */
const Header3 = ({ children }) => {
	const styles = {
		margin: '0',
		fontSize: '1.5rem',
		lineHeight: '1.25',
		fontWeight: 400,
	};

	return <h3 style={styles}>{children}</h3>;
};

/**
 * Default Props.
 */
Header3.defaultProps = {
	children: '',
};

Header3.propTypes = {
	children: PropTypes.node,
};

export default Header3;
