import isEmpty from 'lodash-es/isEmpty';

/**
 * Maps SEO data.
 *
 * @param {object} root Root seo data.
 * @param {object} page Current page seo data.
 */
const mapSeoData = (root, siteSeo, pageSeo) => {
	const getOGImages = (ogImgSite, ogImgPage) => {
		const width = 1200;
		const height = 630;

		if (!isEmpty(ogImgPage)) return [{ url: ogImgPage, width, height }];
		if (!isEmpty(ogImgSite)) return [{ url: ogImgSite, width, height }];

		return [];
	};

	const data = {
		// Root Domain
		domain: root?.domain,

		// Meta Info
		title: pageSeo?.metaTitle ?? ``,
		description: pageSeo?.metaDesc ?? siteSeo?.metaDesc,
		titleTemplate: siteSeo?.metaTitle ? `%s - ${siteSeo?.metaTitle}` : ``,
		metaRobotsNofollow: siteSeo?.metaRobotsNofollow,
		metaRobotsNoindex: siteSeo?.metaRobotsNoindex,

		// Open Graph Info
		ogType: 'website',
		ogTitle: pageSeo?.shareTitle ?? pageSeo?.metaTitle ?? siteSeo?.shareTitle,
		ogDescription: pageSeo?.shareDesc ?? pageSeo?.metaDesc ?? siteSeo?.shareDesc,
		ogImages: getOGImages(siteSeo?.shareGraphic, pageSeo?.shareGraphic),
		ogSiteName: siteSeo?.metaTitle ?? root?.title,

		// Twitter Info
		twitterUsername: siteSeo?.twitterUsername,
		twitterCardType: siteSeo?.twitterCardType,

		// Favicon
		favicon: siteSeo?.favicon,
		touchIcon: siteSeo?.touchIcon,
		faviconLegacy: siteSeo?.faviconLegacy,
	};

	return data;
};

export default mapSeoData;
