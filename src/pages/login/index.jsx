/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { getProviders } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@pages/api/auth/[...nextauth]';

/** Components. */
import LayoutWrapper from '@ui/layouts/LayoutWrapper';

/** Templates. */
import LoginPageTmpl from '@templates/LoginPage';

/** Functions. */
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';

/** Helpers. */
import isEmpty from 'lodash-es/isEmpty';
import parseLoginRedirectUri from '@utils/auth/parseLoginRedirectUri';

/**
 * Render the LoginPage component.
 *
 * @return {Element} The LoginPage component.
 */
const LoginPage = ({ providers, callbackUrl }) => {
	const authProviders = Object.values(providers ?? {}).filter(({ id } = {}) => id !== 'email');
	return <LoginPageTmpl providers={authProviders} callbackUrl={callbackUrl} />;
};

/**
 * Default Props.
 */
LoginPage.defaultProps = {
	callbackUrl: '/',
};

/**
 * Prop Types.
 */
LoginPage.propTypes = {
	providers: PropTypes.shape({}).isRequired,
	callbackUrl: PropTypes.string,
};

/** Page Layout. */
LoginPage.getLayout = (page, data) => (
	<LayoutWrapper layoutType="auth" data={data}>
		{page}
	</LayoutWrapper>
);

/**
 * Get page props.
 *
 * @return {object} Page props.
 */
export const getServerSideProps = async ({ req, res, query }) => {
	const callbackUrl = parseLoginRedirectUri(query?.callbackUrl);

	try {
		const session = await unstable_getServerSession(req, res, authOptions);
		const providers = await getProviders();
		const data = await fetchSiteConfig(false);

		const props = { data, providers, callbackUrl };
		const redirect = { permanent: false, destination: '/' };

		// Redirect authenticated users
		if (!isEmpty(session?.user)) return { redirect };
		return { props };
	} catch (error) {
		return { notFound: true };
	}
};

export default LoginPage;
