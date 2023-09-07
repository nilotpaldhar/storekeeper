import getChecClient from '@config/commerce';
import validateReqMethod from '@utils/api/validateReqMethod';
import formatTokenData from '@utils/checkout/formatTokenData';
import isEmpty from 'lodash-es/isEmpty';

const supportedMethods = ['GET'];
const checClient = getChecClient({ useSecretKey: false });

/** Fetch token data. */
const handler = async (req, res) =>
	validateReqMethod(req, res, supportedMethods, async () => {
		const tokenId = req.query?.id;

		if (isEmpty(tokenId)) {
			res.status(422).json({
				error: 'The given token ID was invalid.',
			});
			return;
		}

		try {
			const data = await checClient.checkout.getToken(`chkt_${tokenId}`);

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

export default handler;
