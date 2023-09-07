import getChecClient from '@config/commerce';
import validateReqMethod from '@utils/api/validateReqMethod';
import isEmpty from 'lodash-es/isEmpty';

const supportedMethods = ['GET'];
const checClient = getChecClient({ useSecretKey: false });

/** Get shipping subdivisions based on country. */
const handler = async (req, res) =>
	validateReqMethod(req, res, supportedMethods, async () => {
		/** Checkout Token ID & Country Code. */
		const tokenId = req.query?.id;
		const countryCode = req.query?.country;

		if (isEmpty(tokenId) || isEmpty(countryCode)) {
			res.status(422).json({
				error: 'The given data was invalid.',
			});
			return;
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

			res.status(200).json({
				success: true,
				data: { subdivisions, html: data?.html },
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
