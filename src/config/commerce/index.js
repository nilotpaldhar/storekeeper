import CommerceSDK from '@chec/commerce.js';
import isBrowser from '@utils/general/isBrowser';

/** Chec API Keys. */
const checApiKey = process.env.NEXT_PUBLIC_CHEC_PUBLIC_KE;
// const checApiKey = process.env.NEXT_PUBLIC_CHEC_PUBLIC_KEY;
const devEnv = process.env.NODE_ENV === 'development';

/** Warn the client if variables are missing. */
if (!checApiKey && isBrowser()) {
	throw Error(
		'Chec/Commerce.js .env variables are missing. Obtain your Chec public key by logging into your Chec account and navigate to Setup > Developer, or can be obtained with the Chec CLI via with the command chec whoami.'
	);
}

/** Provide Commerce configuration options. */
export const commerceConfig = {
	axiosConfig: {
		headers: {
			'X-Chec-Agent': 'commerce.js/v2',
			'Chec-Version': '2022-07-21',
		},
	},
	allowSecretKey: true,
};

/** Setup the Commerce client. */
export const commerceClient = checApiKey
	? new CommerceSDK(checApiKey, devEnv, commerceConfig)
	: null;

export default commerceClient;
