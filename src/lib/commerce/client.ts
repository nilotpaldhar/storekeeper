import CommerceLayer from "@commercelayer/sdk";
import { authenticate } from "@commercelayer/js-auth";

import { config } from "@/lib/config/commerce";

const auth = await authenticate("client_credentials", {
	clientId: config.clientId,
	clientSecret: config.clientSecret,
});

const clClient = CommerceLayer({
	organization: config.organization,
	accessToken: auth.accessToken,
});

export { clClient };
