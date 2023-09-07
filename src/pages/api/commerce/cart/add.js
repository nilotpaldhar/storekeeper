import getChecClient from '@config/commerce';
import getCartData from '@libs/commerce/cart/getCartData';

/** Helpers. */
import toNumber from 'lodash-es/toNumber';
import formatCartData from '@utils/cart/formatCartData';
import validateReqMethod from '@utils/api/validateReqMethod';

const supportedMethods = ['POST'];
const checClient = getChecClient({ useSecretKey: false });

/** Adds the product to the shopping cart. */
const handler = async (req, res) =>
	validateReqMethod(req, res, supportedMethods, async () => {
		const productData = {
			id: req?.body?.id,
			quantity: toNumber(req?.body?.quantity) || 1,
			options: req?.body?.options ?? {},
		};

		try {
			const { id } = await getCartData(req, res);
			const cart = await checClient.request(`carts/${id}`, 'post', productData);

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
