import getChecClient from '@config/commerce';
import retrieveCartId from '@libs/commerce/cart/retrieveCartId';

/** Helpers. */
import formatCartData from '@utils/cart/formatCartData';
import validateReqMethod from '@utils/api/validateReqMethod';

/** Remove discount code from cart. */
const handler = async (req, res) => {
	const supportedMethods = ['POST'];
	const checClient = getChecClient({ useSecretKey: false });

	return validateReqMethod(req, res, supportedMethods, async () => {
		try {
			const cartId = await retrieveCartId(req, res);
			const data = { discount_code: '' };
			const cart = await checClient.request(`carts/${cartId}`, 'put', data);
			return res.status(200).json({ success: true, data: await formatCartData(cart) });
		} catch (error) {
			const statusCode = error?.statusCode || 500;
			const message = error?.data?.error?.message || 'Something went wrong';
			return res.status(statusCode).json({ error: message });
		}
	});
};

export default handler;
