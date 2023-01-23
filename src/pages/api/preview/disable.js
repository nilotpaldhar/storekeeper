/** Disables page preview. */
const disablePreview = async (_, res) => {
	res.clearPreviewData();
	res.writeHead(307, { Location: '/' });
	res.end();
};

export default disablePreview;
