import { authenticate } from "@commercelayer/js-auth";
import CommerceLayer, { type CommerceLayerClient } from "@commercelayer/sdk";

import { config } from "@/lib/config/commerce";

let cachedClient: CommerceLayerClient | null = null;
let tokenExpiry = 0;
let refreshPromise: Promise<CommerceLayerClient> | null = null;

/**
 * Get a Commerce Layer client instance with a valid access token.
 */
const getCommerceLayerClient = async (): Promise<CommerceLayerClient> => {
	// If token is valid, return it
	if (cachedClient && Date.now() < tokenExpiry - 60_000) {
		return cachedClient;
	}

	// If another request is already refreshing, wait for it
	if (refreshPromise) {
		return refreshPromise;
	}

	// Otherwise, start the refresh and store the promise
	refreshPromise = (async () => {
		const auth = await authenticate("client_credentials", {
			clientId: config.clientId,
			clientSecret: config.clientSecret,
		});

		if (!auth?.accessToken) {
			throw new Error(`Commerce Layer auth failed: ${JSON.stringify(auth)}`);
		}

		tokenExpiry = Date.now() + auth.expiresIn * 1000;

		cachedClient = CommerceLayer({
			organization: config.organization,
			accessToken: auth.accessToken,
		});

		return cachedClient;
	})();

	// Wait for the refresh to finish
	try {
		return await refreshPromise;
	} finally {
		// Clear the promise so next expiry can trigger another refresh
		refreshPromise = null;
	}
};

export { getCommerceLayerClient };
