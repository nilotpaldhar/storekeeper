import removeTrailingSlash from '@utils/general/removeTrailingSlash';

export const checApiUrl = removeTrailingSlash(process.env.CHEC_API_URL);
export const checApiVersion = process.env.CHEC_API_VERSION || 'v1';
export const checPublicApiKey = process.env.CHEC_PUBLIC_API_KEY;
export const checSecretApiKey = process.env.CHEC_SECRET_API_KEY;

export const checConfig = {
	axiosConfig: {
		headers: {
			'X-Chec-Agent': 'commerce.js/v2',
			'Chec-Version': '2022-07-21',
		},
	},
	allowSecretKey: false,
};
