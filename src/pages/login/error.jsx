import PropTypes from 'prop-types';

/** Components. */
import LayoutWrapper from '@ui/layouts/LayoutWrapper';

/** Templates. */
import LoginErrorTmpl from '@templates/LoginError';

/** Functions. */
import redirectAuthUser from '@libs/auth/redirectAuthUser';
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';

/** Static Images. */
import authErrorGraphics from '@public/graphics/auth-error.svg';

/**
 * Render the ErrorPage component.
 *
 * @return {Element} The ErrorPage component.
 */
const ErrorPage = ({ errorType }) => <LoginErrorTmpl errorType={errorType} />;

/**
 * Default Props.
 */
ErrorPage.defaultProps = {
	errorType: 'Default',
};

/**
 * Prop Types.
 */
ErrorPage.propTypes = {
	errorType: PropTypes.string,
};

/** Page Layout. */
ErrorPage.getLayout = (page, data) => (
	<LayoutWrapper layoutType="auth" data={data} graphics={authErrorGraphics}>
		{page}
	</LayoutWrapper>
);

/**
 * Get page props.
 *
 * @return {object} Page props.
 */
export const getServerSideProps = async ({ preview, req, res, query }) => {
	const errorType = query?.error ?? 'Default';
	const page = {
		seo: {
			metaTitle: 'Login Error',
			shareTitle: 'Login Error',
		},
	};

	return redirectAuthUser(req, res, async () => {
		try {
			const { siteConfig } = await fetchSiteConfig(preview);
			return { props: { data: { siteConfig, page }, errorType } };
		} catch (error) {
			return { notFound: true };
		}
	});
};

export default ErrorPage;
