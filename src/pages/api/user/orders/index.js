import checConfig from '@config/commerce';
import protectedApiRoute from '@libs/auth/protectedApiRoute';
import formatOrder from '@utils/checkout/formatOrder';

const checClient = checConfig({ useSecretKey: true });

const handler = async (req, res) =>
	protectedApiRoute(req, res, ['GET'], async (user) => {
		const checEndpoint = `customers/${user?.checId}/orders`;
		const page = req?.query?.page || 1;

		try {
			const orders = await checClient.request(`${checEndpoint}?page=${page}`, 'get');
			let formattedOrders = [];

			if (orders?.data) {
				formattedOrders = await Promise.all(
					orders?.data?.map(async (order) => {
						const formattedOrder = await formatOrder(order);
						return formattedOrder;
					})
				);
			}

			res.status(200).json({
				success: true,
				data: { orders: formattedOrders, meta: orders?.meta },
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
