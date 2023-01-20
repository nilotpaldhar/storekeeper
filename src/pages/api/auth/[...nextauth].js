import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
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
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
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
	callbacks: {
		async jwt({ token, account }) {
			if (account?.access_token) {
				token.accessToken = account.access_token;
			}
			return token;
		},
	},
	adapter: ChecSanityAdapter(API_CLIENTS),
	session: { strategy: 'jwt' },
	pages: {
		signIn: '/login',
		error: '/login/error',
		verifyRequest: '/login/verification',
	},
	theme: {
		colorScheme: 'light',
		brandColor: '#0059B3',
		buttonText: '#FFFFFF',
	},
	debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);
