import getChecClient from '@config/commerce';
import validateReqMethod from '@utils/api/validateReqMethod';
import isEmpty from 'lodash-es/isEmpty';

/** Get shipping subdivisions based on country. */
const handler = async (req, res) => {
	const supportedMethods = ['GET'];
	const checClient = getChecClient({ useSecretKey: false });

	/** Checkout Token ID & Country Code. */
	const tokenId = req.query?.id;
	const countryCode = req.query?.country;

	return validateReqMethod(req, res, supportedMethods, async () => {
		if (isEmpty(tokenId) || isEmpty(countryCode)) {
			return res.status(422).json({ error: 'The given data was invalid.' });
		}

		try {
			const data = await checClient.services.localeListShippingSubdivisions(
				`chkt_${tokenId}`,
				countryCode
			);
			const subdivisions = Object.entries(data?.subdivisions).map(([code, name]) => ({
				code,
				name,
			}));

			return res.status(200).json({
				success: true,
				data: { subdivisions, html: data?.html },
			});
		} catch (error) {
			const statusCode = error?.statusCode || 500;
			const message = error?.data?.error?.message || 'Something went wrong';
			return res.status(statusCode).json({ error: message });
		}
	});
};

export default handler;
