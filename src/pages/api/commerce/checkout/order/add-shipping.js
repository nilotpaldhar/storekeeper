import getChecClient from '@config/commerce';
import validateReqMethod from '@utils/api/validateReqMethod';
import formatTokenData from '@utils/checkout/formatTokenData';
import isEmpty from 'lodash-es/isEmpty';

/** Validates and adds shipping option to checkout token. */
const handler = async (req, res) => {
	const supportedMethods = ['POST'];
	const checClient = getChecClient({ useSecretKey: false });

	/** Checkout Token ID && Shipping Details. */
	const tokenId = req.body?.id;
	const payload = {
		region: req.body?.region,
		country: req.body?.country,
		shipping_option_id: req.body?.shippingId,
	};

	return validateReqMethod(req, res, supportedMethods, async () => {
		if (isEmpty(tokenId)) {
			return res.status(422).json({ error: 'The given data was invalid.' });
		}

		try {
			const data = await checClient.checkout.checkShippingOption(tokenId, payload);
			return res.status(200).json({
				success: true,
				data: await formatTokenData(data),
			});
		} catch (error) {
			const statusCode = error?.statusCode || 500;
			const message = error?.data?.error?.message || 'Something went wrong';
			return res.status(statusCode).json({ error: message });
		}
	});
};

export default handler;
