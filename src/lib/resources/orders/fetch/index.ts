import type { Order } from "@commercelayer/sdk";

import { getCommerceLayerClient } from "@/lib/clients/commerce";

/**
 *
 */
const getOrder = async ({ id, status }: { id: string; status?: Order["status"] }) => {
	const clClient = await getCommerceLayerClient();

	try {
		const orders = await clClient.orders.list({
			filters: {
				id_eq: id,
				...(status && { status_eq: status }),
			},
		});
		return orders.at(0) ?? null;
	} catch (error) {
		return null;
	}
};

export { getOrder };
