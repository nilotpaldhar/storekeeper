import getChecClient from '@config/commerce';
import validateReqMethod from '@utils/api/validateReqMethod';
import isEmpty from 'lodash-es/isEmpty';

const supportedMethods = ['POST'];
const checClient = getChecClient({ useSecretKey: false });

/** Validates and adds shipping option to checkout token. */
const handler = async (req, res) =>
	validateReqMethod(req, res, supportedMethods, async () => {
		/** Product id. */
		const productId = req.body?.productId;

		if (isEmpty(productId)) {
			res.status(422).json({
				error: 'The given data was invalid.',
			});
			return;
		}

		try {
			const data = await checClient.products.retrieve(productId);

			res.status(200).json({
				success: true,
				data: {
					inventory: {
						isManaged: data?.inventory?.managed,
						available: data?.inventory?.available,
					},
					outOfStock: data?.conditionals?.is_sold_out,
				},
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
