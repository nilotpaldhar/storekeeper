import getCartData from '@libs/commerce/cart/getCartData';
import formatCartData from '@utils/cart/formatCartData';
import validateReqMethod from '@utils/api/validateReqMethod';

const supportedMethods = ['GET'];

/** Initialize or retrieves cart. */
const handler = async (req, res) =>
	validateReqMethod(req, res, supportedMethods, async () => {
		try {
			const cart = await getCartData(req, res);
			res.status(200).json({
				success: true,
				data: await formatCartData(cart),
			});
		} catch (error) {
			const message = error?.message || 'Something went wrong';
			res.status(500).json({ error: message });
		}
	});

export default handler;
