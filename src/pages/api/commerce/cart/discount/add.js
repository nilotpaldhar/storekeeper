import getChecClient from '@config/commerce';
import retrieveCartId from '@libs/commerce/cart/retrieveCartId';

/** Helpers. */
import formatCartData from '@utils/cart/formatCartData';
import validateReqMethod from '@utils/api/validateReqMethod';

/** Add discount code to cart. */
const handler = async (req, res) => {
	const supportedMethods = ['POST'];
	const checClient = getChecClient({ useSecretKey: false });
	const discountCode = req?.body?.discountCode;

	return validateReqMethod(req, res, supportedMethods, async () => {
		if (!discountCode) {
			return res.status(422).json({ error: 'Invalid discount code' });
		}

		try {
			const cartId = await retrieveCartId(req, res);
			const data = { discount_code: discountCode };
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
