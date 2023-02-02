import getChecClient from '@config/commerce';
import validateReqMethod from '@utils/api/validateReqMethod';
import retrieveCartId from '@libs/commerce/cart/retrieveCartId';

/** Initialize or retrieves cart. */
const handler = async (req, res) => {
	const supportedMethods = ['GET'];
	const checClient = getChecClient({ useSecretKey: false });

	return validateReqMethod(req, res, supportedMethods, async () => {
		try {
			const cartId = await retrieveCartId(req, res);
			const cart = await checClient.cart.retrieve(cartId);
			return res.status(200).json({ success: true, data: cart });
		} catch (error) {
			return res.status(500).json({
				error: error?.message || 'Something went wrong',
			});
		}
	});
};

export default handler;
