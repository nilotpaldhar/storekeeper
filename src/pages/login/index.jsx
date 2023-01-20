import PropTypes from 'prop-types';
import { getProviders } from 'next-auth/react';

/** Components. */
import LayoutWrapper from '@ui/layouts/LayoutWrapper';

/** Templates. */
import LoginPageTmpl from '@templates/LoginPage';

/** Functions. */
import redirectAuthUser from '@libs/auth/redirectAuthUser';
import fetchPage from '@libs/general/dynamic-page/fetchPage';

/** Helpers. */
import mapLoginErrors from '@utils/auth/mapLoginErrors';
import parseLoginRedirectUri from '@utils/auth/parseLoginRedirectUri';

/**
 * Render the LoginPage component.
 *
 * @return {Element} The LoginPage component.
 */
const LoginPage = ({ providers, callbackUrl, error }) => {
	const authProviders = Object.values(providers ?? {}).filter(({ id } = {}) => id !== 'email');
	return <LoginPageTmpl providers={authProviders} callbackUrl={callbackUrl} error={error} />;
};

/**
 * Default Props.
 */
LoginPage.defaultProps = {
	callbackUrl: '/',
	error: null,
};

/**
 * Prop Types.
 */
LoginPage.propTypes = {
	providers: PropTypes.shape({}).isRequired,
	callbackUrl: PropTypes.string,
	error: PropTypes.string,
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
	const error = mapLoginErrors(query?.error);

	return redirectAuthUser(req, res, async () => {
		try {
			const providers = await getProviders();
			const data = await fetchPage(false, 'loginpage');
			return { props: { data, providers, callbackUrl, error } };
		} catch (err) {
			return { notFound: true };
		}
	});
};

export default LoginPage;
