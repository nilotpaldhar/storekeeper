import { env } from "@/lib/config/env";

const config = {
	clientId: env.COMMERCE_LAYER_CLIENT_ID,
	clientSecret: env.COMMERCE_LAYER_CLIENT_SECRET,
	organization: env.COMMERCE_LAYER_ORGANIZATION,
};

export { config };
