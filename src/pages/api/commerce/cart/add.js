import getChecClient from '@config/commerce';
import retrieveCartId from '@libs/commerce/cart/retrieveCartId';

/** Helpers. */
import toNumber from 'lodash-es/toNumber';
import validateReqMethod from '@utils/api/validateReqMethod';

/** Adds the product to the shopping cart. */
const handler = async (req, res) => {
	const supportedMethods = ['POST'];
	const checClient = getChecClient({ useSecretKey: false });
	const productData = {
		id: req?.body?.id,
		quantity: toNumber(req?.body?.quantity) || 1,
		options: req?.body?.options ?? {},
	};

	return validateReqMethod(req, res, supportedMethods, async () => {
		try {
			const cartId = await retrieveCartId(req, res);
			const cart = await checClient.request(`carts/${cartId}`, 'post', productData);
			return res.status(200).json({ success: true, data: cart });
		} catch (error) {
			const statusCode = error?.statusCode || 500;
			const message = error?.data?.error?.message || 'Something went wrong';
			return res.status(statusCode).json({ error: message });
		}
	});
};

export default handler;
