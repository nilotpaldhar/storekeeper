/**
 * Decodes asset URL.
 *
 * @param {string} id Asset ID.
 */
const decodeAssetUrl = (id: string) => {
	const pattern = /^(?:image|file)-([a-f\d]+)-(?:(\d+x\d+)-)?(\w+)$/;

	const result = pattern.exec(id);
	if (!result) return {};

	const [, assetId, dimensions, format] = result;
	const [width, height] = dimensions ? dimensions.split("x").map((v) => parseInt(v, 10)) : [];
	return { assetId, dimensions: { width, height }, format };
};

export { decodeAssetUrl };
