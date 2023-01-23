import trimSlashes from '@utils/general/trimSlashes';

/** Parses preview path. */
const parsePreviewPath = (type, slug) => {
	const pageTypes = ['page', 'shoppage', 'loginpage'];
	if (pageTypes.includes(type) && slug) return `/${trimSlashes(slug)}`;
	return '/';
};

/** Enables page preview. */
const preview = async (req, res) => {
	const previewToken = process.env.SANITY_PREVIEW_TOKEN;
	const reqToken = req.query.token;
	const previewPath = parsePreviewPath(req.query.type, req.query.slug);

	if (!previewToken) {
		throw new Error(`Missing SANITY_PREVIEW_TOKEN`);
	}

	if (reqToken !== previewToken) {
		return res.status(401).json({ error: true, message: 'Invalid token' });
	}

	/** Enable Preview Mode & redirect to a preview route. */
	res.setPreviewData({});
	res.writeHead(307, { Location: previewPath });
	return res.end();
};

export default preview;
