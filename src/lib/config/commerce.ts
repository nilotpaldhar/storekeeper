import { env } from "@/lib/config/env";

const config = {
	clientId: env.COMMERCE_LAYER_CLIENT_ID,
	clientSecret: env.COMMERCE_LAYER_CLIENT_SECRET,
	organization: env.COMMERCE_LAYER_ORGANIZATION,
	marketCode: env.COMMERCE_LAYER_MARKET_CODE,
	stockLocationCode: env.COMMERCE_LAYER_STOCK_LOCATION_CODE,
	currencyCode: env.NEXT_PUBLIC_COMMERCE_LAYER_CURRENCY_CODE,
};

export { config };
