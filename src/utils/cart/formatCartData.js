import formatLineItems from '@utils/cart/formatLineItems';

/** Formats cart data. */
const formatCartData = async (data = {}) => {
	/** Maps product price. */
	const mapPrice = (price = {}) => ({
		raw: price?.raw,
		formatted: price?.formatted,
		formattedWithCode: price?.formatted_with_code,
		formattedWithSymbol: price?.formatted_with_symbol,
	});

	/** Maps cart discount. */
	const mapDiscount = (discount = {}) => ({
		type: discount?.type,
		code: discount?.code,
		value: discount?.value,
		productIds: discount?.product_ids,
		amountSaved: mapPrice(discount?.amount_saved),
	});

	return {
		id: data?.id,
		currency: data?.currency,
		totalItems: data?.total_items,
		count: data?.total_unique_items,
		subtotal: mapPrice(data?.subtotal),
		checkoutUrl: data?.hosted_checkout_url,
		items: await formatLineItems(data?.line_items),
		isEmpty: !data?.total_items && !data?.total_unique_items,
		discount: data?.discount?.length === 0 ? null : mapDiscount(data?.discount),
	};
};

export default formatCartData;
