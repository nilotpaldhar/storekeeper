/* eslint-disable no-underscore-dangle */
const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000';
const token = process.env.SANITY_STUDIO_PREVIEW_TOKEN || 'xxx';
const previewDocTypes = ['page', 'homepage', 'loginpage'];
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
	if (type === 'loginpage') return 'login';
	return '';
};

/** Resolves production URL for preview. */
const resolveProductionUrl = async (prev, { document } = {}) => {
	const docType = document?._type || '';
	const slug = getDocSlug(docType, document);

	if (!rootUrl || !previewDocTypes.includes(docType)) return prev;

	const searchParams = new URLSearchParams();
	searchParams.set('type', docType);
	if (slug) searchParams.set('slug', slug);
	if (token) searchParams.set('token', token);

	return `${rootUrl?.origin}/api/preview?${searchParams}`;
};

export default resolveProductionUrl;
