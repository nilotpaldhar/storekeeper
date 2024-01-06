import { nanoid } from 'nanoid';

import getChecClient from '@config/commerce';
import getSanityClient from '@config/sanity';

import mapAsset from '@utils/general/mapAsset';
import { createChecAsset } from '@libs/seeder/helpers';

import categories from '@libs/seeder/data/categories';

const checClient = getChecClient({ useSecretKey: true });
const sanityClient = getSanityClient({ useCdn: false, useToken: true });

const createChecCategories = async () => {
	const data = await Promise.all(
		categories.map(async (category) => {
			let parentImgId;
			const parentAssets = [];

			if (category.image) {
				parentImgId = await createChecAsset({
					filename: `category-${nanoid()}`,
					url: category.image,
				});
				parentAssets.push(parentImgId);
			}

			const parent = await checClient.request('categories', 'post', {
				...category,
				assets: parentAssets,
				children: [],
			});

			const children = await Promise.all(
				category.children.map(async (child) => {
					const res = await checClient.request('categories', 'post', {
						parent_id: parent?.id,
						...child,
					});
					return res;
				})
			);

			return { ...parent, children };
		})
	);

	return data;
};

const createSanityCategories = async () => {
	const promises = await Promise.all([
		checClient.request('categories?include=breadcrumbs&page=1', 'get'),
		checClient.request('categories?include=breadcrumbs&page=2', 'get'),
		checClient.request('categories?include=breadcrumbs&page=3', 'get'),
	]);

	const checCategories = promises.map((p) => p?.data).flat(1);

	// Map children.
	const mapChildren = (child) => ({
		_key: nanoid(),
		id: child?.id,
		title: child?.name,
		slug: child?.slug,
	});

	// Map breadcrumbs.
	const mapBreadcrumbs = ({ id, permalink, name } = {}) => ({
		id,
		permalink,
		title: name,
		_key: nanoid(),
		_type: 'breadcrumb',
	});

	await Promise.all(
		checCategories?.map(async (category) => {
			let sanityTransaction = sanityClient.transaction();

			const modelId = `category-${category?.id}`;
			const assets = category?.assets?.map(mapAsset);
			const children = category?.children?.map(mapChildren);
			const breadcrumbs = category?.breadcrumbs?.map(mapBreadcrumbs);

			const categoryFields = {
				assets,
				children,
				breadcrumbs,
				slug: category?.slug,
				title: category?.name,
				categoryID: category?.id,
				parentID: category?.parent_id || '',
				description: category?.description || '',
			};

			sanityTransaction = sanityTransaction.createIfNotExists({
				_id: modelId,
				_type: 'category',
			});

			sanityTransaction = sanityTransaction.patch(modelId, (patch) => patch.unset(['assets']));
			sanityTransaction = sanityTransaction.patch(modelId, (patch) => patch.set(categoryFields));

			const result = await sanityTransaction.commit();
			return result;
		})
	);
};

const categorySeeder = async () => {
	const seededCategories = await createChecCategories();
	await createSanityCategories();
	return seededCategories;
};

export default categorySeeder;
