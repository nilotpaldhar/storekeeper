import checConfig from '@config/commerce';
import protectedApiRoute from '@libs/auth/protectedApiRoute';
import isEmpty from 'lodash-es/isEmpty';
import formatAddress from '@utils/user/formatAddress';

const supportedMethods = ['GET', 'PUT', 'DELETE'];
const checClient = checConfig({ useSecretKey: true });

const handleError = (error, res) => {
	const statusCode = error?.statusCode || 500;
	const message = error?.data?.error?.message || 'Something went wrong';

	res.status(statusCode).json({
		error: message,
	});
};

const handler = async (req, res) =>
	protectedApiRoute(req, res, supportedMethods, async (user, reqMethod) => {
		const addressId = req.query?.id;
		const checEndpoint = `customers/${user?.checId}/addresses/${addressId}`;

		if (isEmpty(addressId)) {
			res.status(422).json({ error: 'The given data was invalid.' });
			return;
		}

		/** Get customer address by id */
		if (reqMethod === 'GET') {
			try {
				const data = await checClient.request(checEndpoint, 'get');
				res.status(200).json({ success: true, data: formatAddress(data) });
			} catch (error) {
				handleError(error, res);
			}
		}

		/** Update customer address */
		if (reqMethod === 'PUT') {
			const payload = req?.body?.payload;

			if (isEmpty(payload)) {
				res.status(422).json({ error: 'The given data was invalid.' });
				return;
			}

			const updatedAddress = {
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

			try {
				const data = await checClient.request(checEndpoint, 'put', updatedAddress);
				res.status(200).json({ success: true, data: formatAddress(data) });
			} catch (error) {
				handleError(error, res);
			}
		}

		/** Delete customer address */
		if (reqMethod === 'DELETE') {
			try {
				await checClient.request(checEndpoint, 'delete');
				res.status(200).json({ success: true });
			} catch (error) {
				handleError(error, res);
			}
		}
	});

export default handler;
