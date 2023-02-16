import formatLineItems from '@utils/cart/formatLineItems';

/** Formats token data for checkout. */
const formatTokenData = async (data = {}) => {
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

	/** Maps shipping method. */
	const mapShippingMethod = (method = {}) => ({
		...method,
		price: mapPrice(method?.price),
	});

	return {
		id: data?.id,
		cartId: data?.cart_id,
		currency: data?.currency,
		giftcard: data?.giftcard,
		total: mapPrice(data?.total),
		extraFields: data?.extra_fields,
		subtotal: mapPrice(data?.subtotal),
		totalDue: mapPrice(data?.total_due),
		totalWithTax: mapPrice(data?.total_with_tax),
		items: await formatLineItems(data?.line_items),
		discount: data?.discount?.length === 0 ? null : mapDiscount(data?.discount),
		payWhatYouWant: {
			enabled: data?.pay_what_you_want?.enabled,
			minimum: data?.pay_what_you_want?.minimum,
			customerSetPrice: data?.pay_what_you_want?.customer_set_price,
		},
		conditionals: {
			isCartFree: data?.conditionals?.is_cart_free,
			collectsFullname: data?.conditionals?.collects_fullname,
			hasPayWhatYouWant: data?.conditionals?.has_pay_what_you_want,
			hasDigitalDelivery: data?.conditionals?.has_digital_delivery,
			collectsExtraFields: data?.conditionals?.collects_extra_fields,
			hasPhysicalDelivery: data?.conditionals?.has_physical_delivery,
			hasAvailableDiscounts: data?.conditionals?.has_available_discounts,
			collectsBillingAddress: data?.conditionals?.collects_billing_address,
			collectsShippingAddress: data?.conditionals?.collects_shipping_address,
		},
		shipping: {
			id: data?.shipping?.id,
			provider: data?.shipping?.provider,
			price: mapPrice(data?.shipping?.price),
			description: data?.shipping?.description,
			methods: data?.shipping_methods?.map((method) => mapShippingMethod(method)),
		},
		adjustments: {
			breakdown: data?.adjustments?.breakdown,
			total: mapPrice(data?.adjustments?.total),
			taxable: mapPrice(data?.adjustments?.taxable),
			untaxable: mapPrice(data?.adjustments?.untaxable),
		},
		tax: {
			zone: data?.tax?.zone,
			provider: data?.tax?.provider,
			breakdown: data?.tax?.breakdown,
			amount: mapPrice(data?.tax?.amount),
			includedInPrice: data?.tax?.included_in_price,
		},
	};
};

export default formatTokenData;
