import getChecClient from '@config/commerce';
import validateReqMethod from '@utils/api/validateReqMethod';
import isEmpty from 'lodash-es/isEmpty';

/** */
const handler = async (req, res) => {
	const supportedMethods = ['POST'];
	const checClient = getChecClient({ useSecretKey: false });
	const cartId = req?.body?.cartId;

	return validateReqMethod(req, res, supportedMethods, async () => {
		if (isEmpty(cartId)) {
			return res.status(422).json({ error: 'The given data was invalid.' });
		}

		try {
			const data = await checClient.checkout.generateTokenFrom('cart', cartId);
			const token = data?.id?.split('_')[1];
			return res.status(200).json({ success: true, token });
		} catch (error) {
			const statusCode = error?.statusCode || 500;
			const message = error?.data?.error?.message || 'Something went wrong';
			return res.status(statusCode).json({ error: message });
		}
	});
};

export default handler;
