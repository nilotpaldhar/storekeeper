import { nanoid } from 'nanoid';

/** Maps asset. */
const mapAsset = (asset) => ({
	_key: nanoid(),
	_type: 'asset',
	id: asset?.id,
	url: asset?.url,
	width: asset?.image_dimensions?.width ?? 0,
	height: asset?.image_dimensions?.height ?? 0,
	isImage: asset?.is_image,
	filename: asset?.filename,
	fileSize: asset?.file_size,
	description: asset?.description ?? '',
	fileExtension: asset?.file_extension,
});

export default mapAsset;
