import getChecClient from '@config/commerce';
import validateReqMethod from '@utils/api/validateReqMethod';
import isEmpty from 'lodash-es/isEmpty';

/** Get shipping options based on country and region. */
const handler = async (req, res) => {
	const supportedMethods = ['GET'];
	const checClient = getChecClient({ useSecretKey: false });

	/** Checkout Token ID, Country & State Code. */
	const tokenId = req.query?.id;
	const country = req.query?.country;
	const region = req.query?.region;

	return validateReqMethod(req, res, supportedMethods, async () => {
		if (isEmpty(tokenId) || isEmpty(country) || isEmpty(region)) {
			return res.status(422).json({ error: 'The given data was invalid.' });
		}

		try {
			const options = await checClient.checkout.getShippingOptions(`chkt_${tokenId}`, {
				country,
				region,
			});
			return res.status(200).json({
				success: true,
				data: {
					options: options?.map((option) => ({
						id: option?.id,
						description: option?.description,
						price: {
							raw: option?.price?.raw,
							formatted: option?.price?.formatted,
							formattedWithCode: option?.price?.formatted_with_code,
							formattedWithSymbol: option?.price?.formatted_with_symbol,
						},
						countries: option?.countries,
					})),
				},
			});
		} catch (error) {
			const statusCode = error?.statusCode || 500;
			const message = error?.data?.error?.message || 'Something went wrong';
			return res.status(statusCode).json({ error: message });
		}
	});
};

export default handler;
