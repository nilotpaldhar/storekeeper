import getChecClient from '@config/commerce';
import validateReqMethod from '@utils/api/validateReqMethod';
import retrieveCartId from '@libs/commerce/cart/retrieveCartId';

/** Clears the shopping cart. */
const handler = async (req, res) => {
	const supportedMethods = ['POST'];
	const checClient = getChecClient({ useSecretKey: false });

	return validateReqMethod(req, res, supportedMethods, async () => {
		try {
			const cartId = await retrieveCartId(req, res);
			const cart = await checClient.request(`carts/${cartId}/items`, 'delete');
			return res.status(200).json({ success: true, data: cart });
		} catch (error) {
			const statusCode = error?.statusCode || 500;
			const message = error?.data?.error?.message || 'Something went wrong';
			return res.status(statusCode).json({ error: message });
		}
	});
};

export default handler;
