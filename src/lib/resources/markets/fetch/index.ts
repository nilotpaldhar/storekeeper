import "server-only";

import { getCommerceLayerClient } from "@/lib/clients/commerce";
import { config as clConfig } from "@/lib/config/commerce";
import { logEvent } from "@/lib/logging/log-event";

/**
 * Fetches the default market from Commerce Layer.
 */
const getDefaultMarket = async () => {
	const clClient = await getCommerceLayerClient();

	try {
		const markets = await clClient.markets.list({
			filters: { code_eq: clConfig.marketCode },
		});

		return markets.at(0) ?? null;
	} catch (err) {
		logEvent({
			fn: "getDefaultMarket",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

export { getDefaultMarket };
