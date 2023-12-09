import checConfig from '@config/commerce';
import protectedApiRoute from '@libs/auth/protectedApiRoute';
import formatOrder from '@utils/checkout/formatOrder';
import isEmpty from 'lodash-es/isEmpty';

const checClient = checConfig({ useSecretKey: true });

const handler = async (req, res) =>
	protectedApiRoute(req, res, ['GET'], async (user) => {
		const orderId = req.query?.id;
		const checEndpoint = `customers/${user?.checId}/orders/${orderId}`;

		if (isEmpty(orderId)) {
			res.status(422).json({ error: 'The given data was invalid.' });
			return;
		}

		try {
			const data = await checClient.request(checEndpoint, 'get');
			res.status(200).json({
				success: true,
				data: await formatOrder(data),
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
