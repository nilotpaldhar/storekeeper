import getChecClient from '@config/commerce';
import validateReqMethod from '@utils/api/validateReqMethod';
import mapPrice from '@utils/general/mapPrice';
import isEmpty from 'lodash-es/isEmpty';

const supportedMethods = ['GET'];
const checClient = getChecClient({ useSecretKey: false });

/** Get shipping options based on country and region. */
const handler = async (req, res) =>
	validateReqMethod(req, res, supportedMethods, async () => {
		/** Checkout Token ID, Country & State Code. */
		const tokenId = req.query?.id;
		const country = req.query?.country;
		const region = req.query?.region;

		if (isEmpty(tokenId) || isEmpty(country) || isEmpty(region)) {
			res.status(422).json({
				error: 'The given data was invalid.',
			});
			return;
		}

		try {
			const options = await checClient.checkout.getShippingOptions(`chkt_${tokenId}`, {
				country,
				region,
			});

			res.status(200).json({
				success: true,
				data: {
					options: options?.map((option) => ({
						id: option?.id,
						description: option?.description,
						price: mapPrice(option?.price),
						countries: option?.countries,
					})),
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
