import PropTypes from 'prop-types';

/** Root Styles */
import '@styles/tailwindcss/core.scss';
import '@styles/global.scss';

/**
 * Render the App component.
 *
 * @return {Element} The App component.
 */
const App = ({ Component, pageProps }) => <Component {...pageProps} />;

/**
 * Prop Types.
 */
App.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.shape({}).isRequired,
};

export default App;
