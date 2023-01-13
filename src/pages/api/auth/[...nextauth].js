import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';

/** API clients. */
import getSanityClient from '@config/sanity';
import getChecClient from '@config/commerce';

/** Custom auth adapter. */
import ChecSanityAdapter from '@libs/auth/adapters/ChecSanityAdapter';

const API_CLIENTS = {
	sanity: getSanityClient,
	chec: getChecClient,
};

export const authOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		EmailProvider({
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: process.env.EMAIL_SERVER_PORT,
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: process.env.EMAIL_FROM,
		}),
	],
	adapter: ChecSanityAdapter(API_CLIENTS),
	session: { strategy: 'jwt' },
	debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);
