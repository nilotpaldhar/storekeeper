import getChecClient from '@config/commerce';
import validateReqMethod from '@utils/api/validateReqMethod';
import isEmpty from 'lodash-es/isEmpty';

const supportedMethods = ['GET'];
const checClient = getChecClient({ useSecretKey: false });

/** Get available shipping countries. */
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
			const data = await checClient.services.localeListShippingCountries(`chkt_${tokenId}`);
			const countries = Object.entries(data?.countries).map(([code, name]) => ({ code, name }));

			res.status(200).json({
				success: true,
				data: { countries, html: data?.html },
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
