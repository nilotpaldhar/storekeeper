import getChecClient from '@config/commerce';
import getCartData from '@libs/commerce/cart/getCartData';

/** Helpers. */
import formatCartData from '@utils/cart/formatCartData';
import validateReqMethod from '@utils/api/validateReqMethod';

const supportedMethods = ['POST'];
const checClient = getChecClient({ useSecretKey: false });

/** Add discount code to cart. */
const handler = async (req, res) =>
	validateReqMethod(req, res, supportedMethods, async () => {
		const discountCode = req?.body?.discountCode;

		if (!discountCode) {
			res.status(422).json({
				error: 'Invalid discount code',
			});
			return;
		}

		try {
			const { id } = await getCartData(req, res);
			const data = { discount_code: discountCode };
			const cart = await checClient.request(`carts/${id}`, 'put', data);

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
