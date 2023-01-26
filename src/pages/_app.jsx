import PropTypes from 'prop-types';
import { Nunito } from '@next/font/google';
import { DefaultSeo } from 'next-seo';
import { SessionProvider } from 'next-auth/react';

/** Default Seo Config. */
import defaultSeoConf from '@config/next-seo';

/** Root Styles */
import '@styles/tailwindcss/core.scss';
import '@smastrom/react-rating/style.css';
import '@styles/global.scss';

/** Font Configuration. */
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
const App = ({ Component, pageProps }) => {
	/** Use the layout defined at the page level, if available. */
	const getLayout = Component.getLayout || ((page) => page);

	/** Extract site configuration. */
	const { data: { siteConfig, ...restSiteData } = {}, session, ...restPageProps } = pageProps ?? {};

	return (
		<SessionProvider session={session}>
			<DefaultSeo {...defaultSeoConf} />
			<div className={`${nunito.variable} ${nunito.className} h-full`}>
				{getLayout(<Component {...restSiteData} {...restPageProps} />, {
					...siteConfig,
					pageSeo: restSiteData?.page?.seo,
				})}
			</div>
		</SessionProvider>
	);
};

/**
 * Prop Types.
 */
App.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.shape({
		data: PropTypes.shape({ siteConfig: PropTypes.shape({}) }),
	}).isRequired,
};

export default App;
