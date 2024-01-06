import axios from 'axios';
import getChecClient from '@config/commerce';
import getSanityClient from '@config/sanity';
import isValidUrl from '@utils/general/isValidUrl';

const checClient = getChecClient({ useSecretKey: true });
const sanityClient = getSanityClient({ useCdn: false, useToken: true });

export const createChecAsset = async (payload = {}) => {
	const asset = await checClient.request('assets', 'post', payload);
	return asset.id;
};

export const createSanityAsset = async (assetUrl, type = 'image') => {
	if (!isValidUrl(assetUrl)) {
		throw new Error('Image URL not valid');
	}

	const asset = await axios.get(assetUrl, { responseType: 'arraybuffer' });
	const data = Buffer.from(asset.data, 'binary');
	const uploadedAsset = await sanityClient.assets.upload(type, data);

	// eslint-disable-next-line no-underscore-dangle
	return uploadedAsset._id;
};

export const flattenCategories = (categories = []) => {
	const result = [];

	categories?.forEach((category) => {
		result.push({
			id: category?.id,
			name: category?.name,
			slug: category?.slug,
		});

		category?.children?.forEach((child) => {
			result.push({
				id: child?.id,
				name: child?.name,
				slug: child?.slug,
			});
		});
	});

	return result;
};
