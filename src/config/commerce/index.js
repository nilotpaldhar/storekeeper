import CommerceSDK from '@chec/commerce.js';

/** Chec API Keys. */
const checPublicApiKey = process.env.CHEC_PUBLIC_API_KEY;
const checSecretApiKey = process.env.CHEC_SECRET_API_KEY;
const devEnv = process.env.NODE_ENV === 'development';

/** Provide Commerce configuration options. */
export const commerceConfig = {
	axiosConfig: {
		headers: {
			'X-Chec-Agent': 'commerce.js/v2',
			'Chec-Version': '2022-07-21',
		},
	},
	allowSecretKey: false,
};

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
