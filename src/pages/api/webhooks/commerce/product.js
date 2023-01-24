import { nanoid } from 'nanoid';
import getSanityClient from '@config/sanity';
import validateWebhookReq from '@utils/webhook/validateWebhookReq';

/** Initialize sanity client. */
const sanity = getSanityClient({ useCdn: false, useToken: true });

/** Map product price. */
const mapPrice = (price) => ({
	raw: price?.raw,
	formatted: price?.formatted,
	formattedWithCode: price?.formatted_with_code,
	formattedWithSymbol: price?.formatted_with_symbol,
});

/** Map assets. */
const mapAsset = (asset) => ({
	_key: nanoid(),
	_type: 'asset',
	id: asset?.id,
	url: asset?.url,
	width: asset?.width ?? 0,
	height: asset?.height ?? 0,
	isImage: asset?.is_image,
	filename: asset?.filename,
	fileSize: asset?.file_size,
	description: asset?.description ?? '',
	fileExtension: asset?.file_extension,
});

/** Map product variants. */
const mapVariants = (variant) => ({
	_key: nanoid(),
	_type: 'productVariant',
	id: variant?.id,
	name: variant?.name,
	options: variant?.options?.map(({ id, name, assets, price } = {}) => ({
		id,
		name,
		assets,
		_key: nanoid(),
		price: mapPrice(price),
	})),
});

/** Map document reference. */
const mapDocsRef = ({ _id }) => ({
	_key: nanoid(),
	_type: 'reference',
	_ref: _id,
});

/** Filter empty documents. */
const filterEmptyDocs = (docs) => docs;

const handler = async (req, res) => {
	const options = {
		supportedMethods: ['POST', 'PUT', 'DELETE'],
		supportedEvents: ['products.create', 'products.update', 'products.delete'],
	};

	return validateWebhookReq(req, res, options, async ({ event: reqEvent }) => {
		/** Initiate sanity transaction to perform the following chained mutations. */
		let sanityTransaction = sanity.transaction();

		/** Handle event: "products.delete". */
		if (reqEvent === 'products.delete' && req.body?.model_ids?.length > 0) {
			sanityTransaction.delete(`product-${req.body.model_ids[0]}`);
			const result = await sanityTransaction.commit();

			return res.status(200).json({
				success: true,
				data: result,
				message: 'Product webhook delete event received',
			});
		}

		/** Handle events: "products.create" | "products.update". */
		const productPayload = req.body?.payload;

		/** Fetch product categories from sanity. */
		const sanityCategories = await sanity.getDocuments(
			productPayload?.categories.map(({ id }) => `category-${id}`)
		);

		/** Fetch related products from sanity. */
		const sanityRelProducts = await sanity.getDocuments(
			productPayload?.related_products?.map(({ id }) => `product-${id}`)
		);

		/* ----------------------------------------------- */
		/* Construct product and product fields object.
    /* ----------------------------------------------- */
		const modelId = `product-${productPayload?.id}`;
		const categories = sanityCategories?.filter(filterEmptyDocs)?.map(mapDocsRef);
		const relatedProducts = sanityRelProducts?.filter(filterEmptyDocs)?.map(mapDocsRef);

		const product = { _id: modelId, _type: 'product' };
		const productFields = {
			categories,
			relatedProducts,
			name: productPayload?.name,
			productID: productPayload?.id,
			sku: productPayload?.sku ?? '',
			isActive: productPayload?.active,
			slug: productPayload?.permalink ?? '',
			image: mapAsset(productPayload.image),
			price: mapPrice(productPayload.price),
			assets: productPayload.assets.map(mapAsset),
			description: productPayload?.description ?? '',
			thankYouPage: productPayload?.thank_you_url ?? '',
			variantGroups: productPayload?.variant_groups?.map(mapVariants),
			inventory: {
				isManaged: productPayload?.inventory?.managed,
				available: productPayload?.inventory?.available,
			},
			conditionals: {
				isActive: productPayload?.conditionals?.is_active,
				hasImages: productPayload?.conditionals?.has_images,
				isSoldOut: productPayload?.conditionals?.is_sold_out,
				isTaxExempt: productPayload?.conditionals?.is_tax_exempt,
				collectsFullname: productPayload?.conditionals?.collects_fullname,
				isPayWhatYouWant: productPayload?.conditionals?.is_pay_what_you_want,
				hasDigitalDelivery: productPayload?.conditionals?.has_digital_delivery,
				isInventoryManaged: productPayload?.conditionals?.is_inventory_managed,
				hasPhysicalDelivery: productPayload?.conditionals?.has_physical_delivery,
				collectsExtraFields: productPayload?.conditionals?.collects_extra_fields,
				collectsBillingAddress: productPayload?.conditionals?.collects_billing_address,
				collectsShippingAddress: productPayload?.conditionals?.collects_shipping_address,
			},
			statistics: {
				orders: productPayload?.statistics?.orders,
				sales: mapPrice(productPayload?.statistics?.sales),
			},
			seo: {
				title: productPayload?.seo?.title,
				description: productPayload?.seo?.description,
			},
			checkout: {
				checkoutURL: productPayload?.checkout_url?.checkout,
				checkoutDisplay: productPayload?.checkout_url?.display,
			},
		};

		/* ------------------------------ */
		/* Begin Sanity product sync
    /* ------------------------------ */
		sanityTransaction = sanityTransaction.createIfNotExists(product);
		sanityTransaction = sanityTransaction.patch(modelId, (patch) => patch.set(productFields));
		const result = await sanityTransaction.commit();

		return res.status(200).json({
			success: true,
			data: result,
			message: 'Product webhook event received',
		});
	});
};

export default handler;
