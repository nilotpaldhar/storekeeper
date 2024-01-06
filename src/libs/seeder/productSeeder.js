/* eslint-disable no-underscore-dangle */

import { nanoid } from 'nanoid';

import getChecClient from '@config/commerce';
import getSanityClient from '@config/sanity';

import mapAsset from '@utils/general/mapAsset';
import mapPrice from '@utils/general/mapPrice';
import { createChecAsset } from '@libs/seeder/helpers';

import products from '@libs/seeder/data/products';

const checClient = getChecClient({ useSecretKey: true });
const sanityClient = getSanityClient({ useCdn: false, useToken: true });

const createChecProducts = async (categories = []) => {
	// Create new product
	const newProducts = await Promise.all(
		products.map(async (product) => {
			const assets = await Promise.all(
				product.images.map(async (img, idx) => {
					const assetId = await createChecAsset({
						filename: `product-${nanoid()}`,
						url: img,
					});

					return { id: assetId, sort_order: idx + 1 };
				})
			);

			const res = await checClient.request('products', 'post', {
				...product,
				assets,
				categories: categories
					.filter((c) => product.categories.includes(c?.slug))
					.map((c) => ({ id: c?.id })),
				related_products: [],
			});

			return {
				id: res?.id,
				name: res?.name,
				slug: res?.permalink,
				related_products: product.related_products,
			};
		})
	);

	// Add related products
	const data = await Promise.all(
		newProducts.map(async (np) => {
			const relatedProducts = newProducts
				?.filter((n) => np?.related_products?.includes(n?.name))
				.map((n) => n?.id);

			const res = await checClient.request(`products/${np.id}`, 'put', {
				related_products: relatedProducts,
			});

			return res;
		})
	);

	return data;
};

const createSanityProducts = async (checProducts = []) => {
	// Map product info.
	const mapInfo = (info) => ({
		_key: nanoid(),
		_type: 'productSpec',
		name: info?.name,
		value: info?.value,
	});

	// Map document reference.
	const mapDocsRef = ({ _id }) => ({
		_key: nanoid(),
		_type: 'reference',
		_ref: _id,
	});

	// Filter empty documents.
	const filterEmptyDocs = (docs) => docs;

	// Create new products
	await Promise.all(
		checProducts.map(async (product) => {
			const rawProduct = products.find((p) => p.product.name === product?.name);

			await Promise.all([
				sanityClient.createIfNotExists(rawProduct.brand),
				sanityClient.createIfNotExists(rawProduct.color),
			]);

			let sanityTransaction = sanityClient.transaction();

			// Fetch product categories from sanity.
			const sanityCategories = await sanityClient.getDocuments(
				product?.categories.map(({ id }) => `category-${id}`)
			);

			// Construct product and product fields object.
			const modelId = `product-${product?.id}`;
			const additionalInfo = rawProduct.info.map(mapInfo);
			const categories = sanityCategories?.filter(filterEmptyDocs)?.map(mapDocsRef);

			const brand = { _key: nanoid(), _type: 'reference', _ref: rawProduct.brand._id };
			const color = { _key: nanoid(), _type: 'reference', _ref: rawProduct.color._id };

			const productFields = {
				brand,
				color,
				categories,
				additionalInfo,
				relatedProducts: [],
				name: product?.name,
				displayName: product?.name,
				productID: product?.id,
				sku: product?.sku ?? '',
				isActive: product?.active,
				slug: product?.permalink ?? '',
				excerpt: product?.description,
				description: rawProduct?.content,
				price: mapPrice(product.price),
				assets: product.assets.map(mapAsset),
				thankYouPage: product?.thank_you_url ?? '',
				variantGroups: [],
				image: product.image ? mapAsset(product.image) : undefined,
				inventory: {
					isManaged: product?.inventory?.managed,
					available: product?.inventory?.available,
				},
				conditionals: {
					isActive: product?.conditionals?.is_active,
					hasImages: product?.conditionals?.has_images,
					isSoldOut: product?.conditionals?.is_sold_out,
					isTaxExempt: product?.conditionals?.is_tax_exempt,
					collectsFullname: product?.conditionals?.collects_fullname,
					isPayWhatYouWant: product?.conditionals?.is_pay_what_you_want,
					hasDigitalDelivery: product?.conditionals?.has_digital_delivery,
					isInventoryManaged: product?.conditionals?.is_inventory_managed,
					hasPhysicalDelivery: product?.conditionals?.has_physical_delivery,
					collectsExtraFields: product?.conditionals?.collects_extra_fields,
					collectsBillingAddress: product?.conditionals?.collects_billing_address,
					collectsShippingAddress: product?.conditionals?.collects_shipping_address,
				},
				statistics: {
					orders: product?.statistics?.orders,
					sales: mapPrice(product?.statistics?.sales),
				},
				seo: {
					metaTitle: product?.seo?.title ?? undefined,
					metaDesc: product?.seo?.description ?? undefined,
				},
				checkout: {
					checkoutURL: product?.checkout_url?.checkout,
					checkoutDisplay: product?.checkout_url?.display,
				},
			};

			sanityTransaction = sanityTransaction.createIfNotExists({
				_id: modelId,
				_type: 'product',
			});

			/**
			 * Unset assets, variantGroups, categories and relatedProducts field,
			 * to avoid patch set issues.
			 * */
			sanityTransaction = sanityTransaction.patch(modelId, (patch) =>
				patch.unset(['assets', 'variantGroups', 'categories', 'relatedProducts'])
			);

			sanityTransaction = sanityTransaction.patch(modelId, (patch) => patch.set(productFields));
			const result = await sanityTransaction.commit();

			return result;
		})
	);

	// Add related products
	await Promise.all(
		checProducts.map(async (product) => {
			if (!product?.related_products?.length) return;

			let sanityTransaction = sanityClient.transaction();

			// Fetch related products from sanity.
			const sanityRelProducts = await sanityClient.getDocuments(
				product?.related_products?.map(({ id }) => `product-${id}`)
			);

			const modelId = `product-${product?.id}`;
			const relatedProducts = sanityRelProducts?.filter(filterEmptyDocs)?.map(mapDocsRef);

			sanityTransaction = sanityTransaction.patch(modelId, (patch) =>
				patch.unset(['relatedProducts'])
			);

			sanityTransaction = sanityTransaction.patch(modelId, (patch) =>
				patch.set({
					relatedProducts,
				})
			);

			await sanityTransaction.commit();
		})
	);
};

const productSeeder = async (categories = []) => {
	const checProducts = await createChecProducts(categories);
	await createSanityProducts(checProducts);
};

export default productSeeder;
