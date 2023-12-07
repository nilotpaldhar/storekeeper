import checConfig from '@config/commerce';
import protectedApiRoute from '@libs/auth/protectedApiRoute';

import { ValidationError } from 'yup';
import { addressValidator } from '@libs/validation/user';
import formatAddress from '@utils/user/formatAddress';

const supportedMethods = ['GET', 'POST'];
const checClient = checConfig({ useSecretKey: true });

const handler = async (req, res) =>
	protectedApiRoute(req, res, supportedMethods, async (user, reqMethod) => {
		const checEndpoint = `customers/${user?.checId}/addresses`;

		/** Get list of addresses for a customer */
		if (reqMethod === 'GET') {
			try {
				const page = req?.query?.page || 1;
				const addresses = await checClient.request(`${checEndpoint}?page=${page}`, 'get');

				res.status(200).json({
					success: true,
					data: {
						addresses: addresses?.data?.map(formatAddress),
						meta: addresses?.meta,
					},
				});
			} catch (error) {
				const statusCode = error?.statusCode || 500;
				const message = error?.data?.error?.message || 'Something went wrong';

				res.status(statusCode).json({
					error: message,
				});
			}
		}

		/** Create new address for a customer */
		if (reqMethod === 'POST') {
			try {
				const payload = await addressValidator.validate(req?.body?.payload, {
					stripUnknown: true,
				});

				const newAddress = {
					name: payload?.fullname,
					street: payload?.street1,
					street_2: payload?.street2,
					town_city: payload?.city,
					postal_zip_code: payload?.zip,
					county_state: payload?.region,
					country: payload?.country,
					delivery_instructions: payload?.notes,
					default_shipping: payload?.defaultShipping,
					default_billing: payload?.defaultBilling,
				};

				const data = await checClient.request(checEndpoint, 'post', newAddress);

				res.status(200).json({
					success: true,
					data: formatAddress(data),
				});
			} catch (error) {
				if (error instanceof ValidationError) {
					res.status(422).json({
						error: 'The given data was invalid.',
					});
					return;
				}

				const statusCode = error?.statusCode || 500;
				const message = error?.data?.error?.message || 'Something went wrong';

				res.status(statusCode).json({
					error: message,
				});
			}
		}
	});

export default handler;
