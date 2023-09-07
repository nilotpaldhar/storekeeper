import getChecClient from '@config/commerce';
import validateReqMethod from '@utils/api/validateReqMethod';
import formatTokenData from '@utils/checkout/formatTokenData';
import isEmpty from 'lodash-es/isEmpty';

const supportedMethods = ['POST'];
const checClient = getChecClient({ useSecretKey: false });

/** Validates and adds shipping option to checkout token. */
const handler = async (req, res) => {
	validateReqMethod(req, res, supportedMethods, async () => {
		/** Checkout Token ID && Tax Zone Details. */
		const tokenId = req.body?.id;
		const payload = {
			region: req.body?.region,
			country: req.body?.country,
			postal_zip_code: req.body?.zip,
		};

		if (isEmpty(tokenId)) {
			res.status(422).json({
				error: 'The given data was invalid.',
			});
			return;
		}

		try {
			const data = await checClient.checkout.setTaxZone(tokenId, payload);

			res.status(200).json({
				success: true,
				data: await formatTokenData(data),
			});
		} catch (error) {
			const statusCode = error?.statusCode || 500;
			const message = error?.data?.error?.message || 'Something went wrong';

			res.status(statusCode).json({
				error: message,
			});
		}
	});
};

export default handler;
