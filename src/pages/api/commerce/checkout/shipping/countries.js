import getChecClient from '@config/commerce';
import validateReqMethod from '@utils/api/validateReqMethod';
import isEmpty from 'lodash-es/isEmpty';

/** Get available shipping countries. */
const handler = async (req, res) => {
	const supportedMethods = ['GET'];
	const checClient = getChecClient({ useSecretKey: false });

	/** Checkout Token ID. */
	const tokenId = req.query?.id;

	return validateReqMethod(req, res, supportedMethods, async () => {
		if (isEmpty(tokenId)) {
			return res.status(422).json({ error: 'The given token ID was invalid.' });
		}

		try {
			const data = await checClient.services.localeListShippingCountries(`chkt_${tokenId}`);
			const countries = Object.entries(data?.countries).map(([code, name]) => ({ code, name }));

			return res.status(200).json({
				success: true,
				data: { countries, html: data?.html },
			});
		} catch (error) {
			const statusCode = error?.statusCode || 500;
			const message = error?.data?.error?.message || 'Something went wrong';
			return res.status(statusCode).json({ error: message });
		}
	});
};

export default handler;
