import getChecClient from '@config/commerce';
import getCartData from '@libs/commerce/cart/getCartData';

/** Helpers. */
import isEmpty from 'lodash-es/isEmpty';
import formatCartData from '@utils/cart/formatCartData';
import validateReqMethod from '@utils/api/validateReqMethod';

const supportedMethods = ['POST'];
const checClient = getChecClient({ useSecretKey: false });

/** Removes items from the shopping cart. */
const handler = async (req, res) =>
	validateReqMethod(req, res, supportedMethods, async () => {
		const itemId = req?.body?.itemId;

		if (isEmpty(itemId)) {
			res.status(422).json({
				error: 'The given data was invalid.',
			});
			return;
		}

		try {
			const { id } = await getCartData(req, res);
			const cart = await checClient.request(`carts/${id}/items/${itemId}`, 'delete');

			res.status(200).json({
				success: true,
				data: await formatCartData(cart),
			});
		} catch (error) {
			const statusCode = error?.statusCode || 500;
			const message = error?.data?.error?.message || 'Something went wrong';

			res.status(statusCode).json({
				error: statusCode === 404 ? 'Cart item not found with the given ID' : message,
			});
		}
	});

export default handler;
