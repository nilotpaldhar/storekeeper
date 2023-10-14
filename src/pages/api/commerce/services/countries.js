import getChecClient from '@config/commerce';
import validateReqMethod from '@utils/api/validateReqMethod';

const supportedMethods = ['GET'];
const checClient = getChecClient({ useSecretKey: false });

/** Get list of countries. */
const handler = async (req, res) =>
	validateReqMethod(req, res, supportedMethods, async () => {
		try {
			const data = await checClient.services.localeListCountries();
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
