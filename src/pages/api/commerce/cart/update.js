import getChecClient from '@config/commerce';
import retrieveCartId from '@libs/commerce/cart/retrieveCartId';

/** Helpers. */
import isEmpty from 'lodash-es/isEmpty';
import toNumber from 'lodash-es/toNumber';
import validateReqMethod from '@utils/api/validateReqMethod';

/** Removes items from the shopping cart. */
const handler = async (req, res) => {
	const supportedMethods = ['PUT'];
	const checClient = getChecClient({ useSecretKey: false });
	const itemId = req?.body?.itemId;
	const productData = {
		quantity: toNumber(req?.body?.quantity) || 1,
		options: req?.body?.options ?? {},
	};

	return validateReqMethod(req, res, supportedMethods, async () => {
		if (isEmpty(itemId)) {
			return res.status(422).json({
				error: 'The given data was invalid.',
			});
		}

		try {
			const cartId = await retrieveCartId(req, res);
			const cart = await checClient.request(`carts/${cartId}/items/${itemId}`, 'put', productData);
			return res.status(200).json({ success: true, data: cart });
		} catch (error) {
			const statusCode = error?.statusCode || 500;
			const message = error?.data?.error?.message || 'Something went wrong';
			return res.status(statusCode).json({
				error: statusCode === 404 ? 'Cart item not found with the given ID' : message,
			});
		}
	});
};

export default handler;
