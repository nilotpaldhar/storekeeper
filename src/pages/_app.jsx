import PropTypes from 'prop-types';
import { Nunito } from '@next/font/google';

/** Root Styles */
import '@styles/tailwindcss/core.scss';
import '@styles/global.scss';

const nunito = Nunito({
	subsets: ['latin'],
	fallback: ['sans-serif'],
	variable: '--font-nunito',
	style: ['normal', 'italic'],
	weight: ['300', '400', '500', '600', '700', '800'],
});

/**
 * Render the App component.
 *
 * @return {Element} The App component.
 */
const App = ({ Component, pageProps }) => (
	<div className={`${nunito.variable} ${nunito.className}`}>
		<Component {...pageProps} />
	</div>
);

/**
 * Prop Types.
 */
App.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.shape({}).isRequired,
};

export default App;
