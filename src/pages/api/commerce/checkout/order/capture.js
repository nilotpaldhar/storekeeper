import getChecClient from '@config/commerce';
import validateReqMethod from '@utils/api/validateReqMethod';
import formatOrder from '@utils/checkout/formatOrder';
import isEmpty from 'lodash-es/isEmpty';

/** Captures an order with payment. */
const handler = async (req, res) => {
	const supportedMethods = ['POST'];
	const checClient = getChecClient({ useSecretKey: false });

	/** Checkout Token ID && Order Payload. */
	const tokenId = req.body?.id;
	const payload = req.body?.payload;

	return validateReqMethod(req, res, supportedMethods, async () => {
		if (isEmpty(tokenId) || isEmpty(payload)) {
			return res.status(422).json({ error: 'The given data was invalid.' });
		}

		try {
			const data = await checClient.checkout.capture(tokenId, payload);
			return res.status(200).json({
				success: true,
				data: await formatOrder(data),
			});
		} catch (error) {
			const statusCode = error?.statusCode || 500;
			const message = error?.data?.error?.message || 'Something went wrong';
			return res.status(statusCode).json({ error: message });
		}
	});
};

export default handler;
