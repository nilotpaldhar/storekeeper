import getChecClient from '@config/commerce';
import validateReqMethod from '@utils/api/validateReqMethod';
import formatOrder from '@utils/checkout/formatOrder';
import isEmpty from 'lodash-es/isEmpty';

const supportedMethods = ['POST'];
const checClient = getChecClient({ useSecretKey: false });

/** Captures an order with payment. */
const handler = async (req, res) =>
	validateReqMethod(req, res, supportedMethods, async () => {
		/** Checkout Token ID && Order Payload. */
		const tokenId = req?.body?.id;
		const payload = req?.body?.payload;

		if (isEmpty(tokenId) || isEmpty(payload)) {
			res.status(422).json({
				error: 'The given data was invalid.',
			});
			return;
		}

		try {
			const data = await checClient.checkout.capture(tokenId, payload);

			res.status(200).json({
				success: true,
				data: await formatOrder(data),
			});
		} catch (error) {
			const statusCode = error?.statusCode || 500;
			const message = error?.data?.error?.message || 'Something went wrong';

			res.status(statusCode).json({
				error: message,
			});
		}
	});

export default handler;
