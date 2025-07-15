import "server-only";

import { getCommerceLayerClient } from "@/lib/clients/commerce";
import { config as clConfig } from "@/lib/config/commerce";
import { logEvent } from "@/lib/logging/log-event";

/**

/**
 * Fetches the default stock location from Commerce Layer.
 */
const getDefaultStockLocation = async () => {
	const clClient = await getCommerceLayerClient();

	try {
		const locations = await clClient.stock_locations.list({
			filters: { code_eq: clConfig.stockLocationCode },
		});

		return locations.at(0) ?? null;
	} catch (err) {
		logEvent({
			fn: "getDefaultStockLocation",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

export { getDefaultStockLocation };
