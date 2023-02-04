import getChecClient from '@config/commerce';
import retrieveCartId from '@libs/commerce/cart/retrieveCartId';

/** Helpers. */
import formatCartData from '@utils/cart/formatCartData';
import validateReqMethod from '@utils/api/validateReqMethod';

/** Initialize or retrieves cart. */
const handler = async (req, res) => {
	const supportedMethods = ['GET'];
	const checClient = getChecClient({ useSecretKey: false });

	return validateReqMethod(req, res, supportedMethods, async () => {
		try {
			const cartId = await retrieveCartId(req, res);
			const cart = await checClient.cart.retrieve(cartId);
			return res.status(200).json({ success: true, data: await formatCartData(cart) });
		} catch (error) {
			return res.status(500).json({
				error: error?.message || 'Something went wrong',
			});
		}
	});
};

export default handler;
