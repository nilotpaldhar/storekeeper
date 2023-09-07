import getChecClient from '@config/commerce';
import getCartData from '@libs/commerce/cart/getCartData';

/** Helpers. */
import formatCartData from '@utils/cart/formatCartData';
import validateReqMethod from '@utils/api/validateReqMethod';

const supportedMethods = ['DELETE'];
const checClient = getChecClient({ useSecretKey: false });

/** Remove discount code from cart. */
const handler = async (req, res) =>
	validateReqMethod(req, res, supportedMethods, async () => {
		try {
			const { id } = await getCartData(req, res);
			const cart = await checClient.request(`carts/${id}`, 'put', {
				discount_code: '',
			});

			res.status(200).json({
				success: true,
				data: await formatCartData(cart),
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
