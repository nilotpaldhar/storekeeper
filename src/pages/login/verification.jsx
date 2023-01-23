/** Components. */
import LayoutWrapper from '@ui/layouts/LayoutWrapper';

/** Templates. */
import LoginVerificationTmpl from '@templates/LoginVerification';

/** Functions. */
import redirectAuthUser from '@libs/auth/redirectAuthUser';
import fetchSiteConfig from '@libs/general/site-config/fetchSiteConfig';

/** Static Images. */
import authVerificationGraphics from '@public/graphics/auth-verification.svg';

/**
 * Render the VerificationPage component.
 *
 * @return {Element} The VerificationPage component.
 */
const VerificationPage = () => <LoginVerificationTmpl />;

/**
 * Prop Types.
 */
VerificationPage.propTypes = {};

/** Page Layout. */
VerificationPage.getLayout = (page, data) => (
	<LayoutWrapper layoutType="auth" data={data} graphics={authVerificationGraphics}>
		{page}
	</LayoutWrapper>
);

/**
 * Get page props.
 *
 * @return {object} Page props.
 */
export const getServerSideProps = async ({ preview, req, res }) => {
	const page = {
		seo: {
			metaTitle: 'Email Verification',
			shareTitle: 'Email Verification',
		},
	};

	return redirectAuthUser(req, res, async () => {
		try {
			const { siteConfig } = await fetchSiteConfig(preview);
			return { props: { data: { siteConfig, page } } };
		} catch (error) {
			return { notFound: true };
		}
	});
};

export default VerificationPage;
