/* eslint-disable no-underscore-dangle */
const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000';
const token = process.env.SANITY_STUDIO_PREVIEW_TOKEN || '';
const previewDocTypes = ['page', 'homepage', 'shoppage', 'loginpage'];
let rootUrl;

try {
	rootUrl = new URL(previewUrl);
} catch (err) {
	// eslint-disable-next-line no-console
	console.error('Invalid productionUrl', err);
}

/** Get document slug by type. */
const getDocSlug = (type, doc) => {
	if (type === 'page') return doc?.slug?.current;
	if (type === 'shoppage') return 'shop';
	if (type === 'loginpage') return 'login';
	return '';
};

/** Resolves production URL for preview. */
const resolveProductionUrl = (doc) => {
	const docType = doc?._type || '';
	const slug = getDocSlug(docType, doc);
	if (!rootUrl || !previewDocTypes.includes(docType)) return false;

	const searchParams = new URLSearchParams();
	searchParams.set('type', docType);
	if (slug) searchParams.set('slug', slug);
	if (token) searchParams.set('token', token);

	return `${rootUrl?.origin}/api/preview?${searchParams}`;
};

export default resolveProductionUrl;
