import checConfig from '@config/commerce';
import protectedApiRoute from '@libs/auth/protectedApiRoute';
import isEmpty from 'lodash-es/isEmpty';

const checClient = checConfig({ useSecretKey: true });

const handler = async (req, res) =>
	protectedApiRoute(req, res, ['POST'], async (user) => {
		const orderId = req.body?.id;

		if (isEmpty(orderId)) {
			res.status(422).json({ error: 'The given data was invalid.' });
			return;
		}

		try {
			const order = await checClient.request(`customers/${user?.checId}/orders/${orderId}`, 'get');
			await checClient.request(`orders/${order?.id}/actions/resend-receipt`, 'post');

			res.status(201).json({ success: true, data: {} });
		} catch (error) {
			const statusCode = error?.statusCode || 500;
			const message = error?.data?.error?.message || 'Something went wrong';

			res.status(statusCode).json({
				error: message,
			});
		}
	});

export default handler;
