import { groq } from 'next-sanity';
import getSanityClient from '@config/sanity';
import { createPermalink } from '@utils/product/permalink';

const sanityClient = getSanityClient({ useCdn: false, useToken: false });

/** Formats cart data. */
const formatCartData = async (data = {}) => {
	/** Maps product price. */
	const mapPrice = (price = {}) => ({
		raw: price?.raw,
		formatted: price?.formatted,
		formattedWithCode: price?.formatted_with_code,
		formattedWithSymbol: price?.formatted_with_symbol,
	});

	/** Maps product assets. */
	const mapAsset = (asset = {}) => ({
		id: asset?.id,
		url: asset?.url,
		width: asset?.image_dimensions?.width,
		height: asset?.image_dimensions?.height,
		isImage: asset?.is_image,
		filename: asset?.filename,
		fileSize: asset?.file_size,
		description: asset?.description,
		fileExtension: asset?.file_extension,
	});

	/** Maps selected option. */
	const mapOption = (option = {}) => ({
		id: option?.option_id,
		name: option?.option_name,
		group: {
			id: option?.group_id,
			name: option?.group_name,
		},
	});

	/** Maps product variant. */
	const mapVariant = (variant = {}) => ({
		id: variant?.id,
		sku: variant?.sku,
		meta: variant?.meta,
		options: variant?.options,
		isValid: variant?.is_valid,
		inventory: variant?.inventory,
		description: variant?.description,
		invalidReasonCode: variant?.invalid_reason_code,
		price: variant?.price ? mapPrice(variant?.price) : {},
		assets: variant?.assets ? variant?.assets?.map(mapAsset) : [],
	});

	const formatedData = {
		id: data?.id,
		currency: data?.currency,
		totalItems: data?.total_items,
		discounts: data?.discount ?? [],
		subtotal: mapPrice(data?.subtotal),
		checkoutUrl: data?.hosted_checkout_url,
		totalUniqueItems: data?.total_unique_items,
		isEmpty: !data?.total_items && !data?.total_unique_items,
		items: await Promise.all(
			data?.line_items?.map(async (item) => {
				const productId = item?.product_id;
				const query = groq`*[_type == "product" && isActive == true && productID == $id][0]{
					name, displayName, inventory, slug
				}`;

				try {
					const product = await sanityClient.fetch(query, { id: productId });
					return {
						productId,
						id: item?.id,
						sku: item?.sku,
						tax: item?.tax,
						isValid: item?.is_valid,
						meta: item?.product_meta,
						quantity: item?.quantity,
						price: mapPrice(item?.price),
						image: mapAsset(item?.image),
						total: mapPrice(item?.line_total),
						permalink: createPermalink(productId, product?.slug),
						selectedOptions: item?.selected_options?.map(mapOption),
						variant: item?.variant ? mapVariant(item?.variant) : null,
						...product,
					};
				} catch (error) {
					return null;
				}
			})
		),
	};

	formatedData.items = formatedData.items?.filter((item) => !!item);
	return formatedData;
};

export default formatCartData;
