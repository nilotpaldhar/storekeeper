import CommerceSDK from '@chec/commerce.js';
import { checPublicApiKey, checSecretApiKey, checConfig } from '@config/commerce/constants';

const devEnv = process.env.NODE_ENV === 'development';
const commerceConfig = checConfig;

/** Setup the Commerce client. */
export const getClient = ({ useSecretKey = false } = {}) => {
	/** Warn the client if variables are missing. */
	if (!checPublicApiKey || !checSecretApiKey) {
		throw Error(
			'Chec/Commerce.js .env variables are missing. Obtain your Chec public/secret key by logging into your Chec account and navigate to Setup > Developer, or can be obtained with the Chec CLI via with the command chec whoami.'
		);
	}

	commerceConfig.allowSecretKey = !!useSecretKey;
	const apiKey = useSecretKey ? checSecretApiKey : checPublicApiKey;
	return apiKey ? new CommerceSDK(apiKey, devEnv, commerceConfig) : null;
};

export default getClient;
