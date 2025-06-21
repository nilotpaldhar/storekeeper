import CommerceLayer from "@commercelayer/sdk";
import { authenticate } from "@commercelayer/js-auth";

import { env } from "@/lib/env";

const auth = await authenticate("client_credentials", {
	clientId: env.COMMERCE_LAYER_CLIENT_ID,
	clientSecret: env.COMMERCE_LAYER_CLIENT_SECRET,
});

const client = CommerceLayer({
	organization: env.COMMERCE_LAYER_ORGANIZATION,
	accessToken: auth.accessToken,
});

export { client };
