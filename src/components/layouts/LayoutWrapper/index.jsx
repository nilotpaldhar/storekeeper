import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

/** Layouts. */
import AuthLayout from '@ui/layouts/AuthLayout';
import PrimaryLayout from '@ui/layouts/PrimaryLayout';
import DashboardLayout from '@ui/layouts/DashboardLayout';

/** Helpers. */
import mapSeoData from '@utils/general/mapSeoData';

/** Components. */
const Seo = dynamic(() => import('@ui/general/Seo'));
const Promobar = dynamic(() => import('@ui/general/Promobar'));
const CookieConsent = dynamic(() => import('@ui/general/CookieConsent'));
const Notification = dynamic(() => import('@ui/feedback/Notification'));

/**
 * Render the LayoutWrapper component.
 *
 * @return {Element} The LayoutWrapper component.
 */
const LayoutWrapper = ({ data, layoutType, children, ...props }) => {
	const { root, seo, pageSeo, header, footer, cookie, promo } = data ?? {};
	const seoData = mapSeoData(root, seo, pageSeo);

	return (
		<>
			<Seo {...seoData} />
			{layoutType !== 'auth' && <Promobar {...promo} />}
			<CookieConsent {...cookie} />
			<Notification />
			{layoutType === 'auth' && (
				<AuthLayout site={root} {...props}>
					{children}
				</AuthLayout>
			)}
			{layoutType === 'dashboard' && (
				<DashboardLayout data={{ header, footer }} {...props}>
					{children}
				</DashboardLayout>
			)}
			{layoutType === 'primary' && (
				<PrimaryLayout data={{ header, footer }} {...props}>
					{children}
				</PrimaryLayout>
			)}
		</>
	);
};

/**
 * Default Props.
 */
LayoutWrapper.defaultProps = {
	layoutType: 'primary',
	children: '',
};

/**
 * Prop Types.
 */
LayoutWrapper.propTypes = {
	data: PropTypes.shape({
		pageSeo: PropTypes.shape({}),
		header: PropTypes.shape({}),
		footer: PropTypes.shape({}),
		cookie: PropTypes.shape({}),
		promo: PropTypes.shape({}),
		root: PropTypes.shape({}),
		seo: PropTypes.shape({}),
	}).isRequired,
	layoutType: PropTypes.oneOf(['primary', 'auth', 'dashboard']),
	children: PropTypes.node,
};

export default LayoutWrapper;
