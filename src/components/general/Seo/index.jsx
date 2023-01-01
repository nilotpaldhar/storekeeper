import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

/** Components. */
import { NextSeo } from 'next-seo';

/** Helpers. */
import trimSlashes from '@utils/general/trimSlashes';

/**
 * Render the Seo component.
 *
 * @return {Element} The Seo component.
 */
const Seo = ({
	title,
	ogType,
	domain,
	favicon,
	ogTitle,
	ogImages,
	touchIcon,
	ogSiteName,
	description,
	faviconLegacy,
	ogDescription,
	titleTemplate,
	twitterUsername,
	twitterCardType,
	metaRobotsNoindex,
	metaRobotsNofollow,
}) => {
	const router = useRouter();
	const favicons = [];

	/** Create canonical URL. */
	const currentLocation = typeof window !== 'undefined' ? window?.location?.origin : '';
	const siteUrl = trimSlashes(domain || currentLocation);
	const canonicalUrl = siteUrl + (router.asPath === '/' ? '' : router.asPath).split('?')[0];

	/** Favicon. */
	if (favicon) {
		favicons.push({
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			href: favicon,
		});
	}

	/** Favicon (legacy). */
	if (faviconLegacy) {
		favicons.push({
			rel: 'icon',
			sizes: 'any',
			href: faviconLegacy,
		});
	}

	/** Touch Icon. */
	if (touchIcon) {
		favicons.push({
			rel: 'apple-touch-icon',
			sizes: '192x192',
			href: touchIcon,
		});
	}

	/** Theme Color. */
	const themeColor = [
		{ property: 'theme-color', content: '##0059B3' },
		{ property: 'msapplication-TileColor', content: '##0059B3' },
	];

	return (
		<NextSeo
			title={title}
			canonical={canonicalUrl}
			description={description}
			noindex={metaRobotsNoindex}
			titleTemplate={titleTemplate}
			nofollow={metaRobotsNofollow}
			openGraph={{
				type: ogType,
				title: ogTitle,
				images: ogImages,
				url: canonicalUrl,
				siteName: ogSiteName,
				description: ogDescription,
			}}
			twitter={{
				site: twitterUsername,
				handle: twitterUsername,
				cardType: twitterCardType,
			}}
			additionalLinkTags={[...favicons]}
			additionalMetaTags={[...themeColor]}
		/>
	);
};

/**
 * Default Props.
 */
Seo.defaultProps = {
	touchIcon: '',
	faviconLegacy: '',
	title: '',
	domain: '',
	ogType: '',
	favicon: '',
	ogTitle: '',
	ogImages: [],
	ogSiteName: '',
	description: '',
	ogDescription: '',
	titleTemplate: '',
	twitterUsername: '',
	metaRobotsNoindex: false,
	metaRobotsNofollow: false,
	twitterCardType: 'summary_large_image',
};

/**
 * Prop Types.
 */
Seo.propTypes = {
	touchIcon: PropTypes.string,
	faviconLegacy: PropTypes.string,
	title: PropTypes.string,
	domain: PropTypes.string,
	ogType: PropTypes.string,
	favicon: PropTypes.string,
	ogTitle: PropTypes.string,
	ogSiteName: PropTypes.string,
	description: PropTypes.string,
	ogDescription: PropTypes.string,
	titleTemplate: PropTypes.string,
	metaRobotsNoindex: PropTypes.bool,
	twitterUsername: PropTypes.string,
	metaRobotsNofollow: PropTypes.bool,
	ogImages: PropTypes.arrayOf(PropTypes.shape({})),
	twitterCardType: PropTypes.oneOf(['summary_large_image', 'summary']),
};

export default Seo;
