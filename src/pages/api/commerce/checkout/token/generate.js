import getChecClient from '@config/commerce';
import validateReqMethod from '@utils/api/validateReqMethod';
import isEmpty from 'lodash-es/isEmpty';

const supportedMethods = ['POST'];
const checClient = getChecClient({ useSecretKey: false });

/** Generates a new token for checkout. */
const handler = async (req, res) =>
	validateReqMethod(req, res, supportedMethods, async () => {
		const cartId = req?.body?.cartId;

		if (isEmpty(cartId)) {
			res.status(422).json({
				error: 'The given data was invalid.',
			});
			return;
		}

		try {
			const data = await checClient.checkout.generateTokenFrom('cart', cartId);
			const token = data?.id?.split('_')[1];

			res.status(200).json({
				success: true,
				token,
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
