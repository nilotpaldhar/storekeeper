import getChecClient from '@config/commerce';
import validateReqMethod from '@utils/api/validateReqMethod';
import formatTokenData from '@utils/checkout/formatTokenData';
import isEmpty from 'lodash-es/isEmpty';

/** */
const handler = async (req, res) => {
	const supportedMethods = ['GET'];
	const checClient = getChecClient({ useSecretKey: false });
	const tokenId = req.query?.id;

	return validateReqMethod(req, res, supportedMethods, async () => {
		if (isEmpty(tokenId)) {
			return res.status(422).json({ error: 'The given token ID was invalid.' });
		}

		try {
			const data = await checClient.checkout.getToken(`chkt_${tokenId}`);
			return res.status(200).json({
				success: true,
				data: await formatTokenData(data),
			});
		} catch (error) {
			const statusCode = error?.statusCode || 500;
			const message = error?.data?.error?.message || 'Something went wrong';
			return res.status(statusCode).json({ error: message });
		}
	});
};

export default handler;
