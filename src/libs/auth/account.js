import { groq } from 'next-sanity';
import user from '@libs/auth/user';

export const account = (client) => {
	const sanity = client?.sanity({ useCdn: false });
	const getUser = user(client).get;

	/** Find account. */
	const findAccount = async (providerId = '', providerAccountId = '') => {
		const query = groq`*[_type == "account" && providerId == $providerId && providerAccountId == $providerAccountId]{
				..., user->{"id":_id, name, email, emailVerified, image}
			}[0]`;

		try {
			const foundAcc = await sanity.fetch(query, { providerId, providerAccountId });
			return foundAcc ?? null;
		} catch (error) {
			return null;
		}
	};

	return {
		/** Link account. */
		async linkUser({
			type,
			userId,
			provider,
			providerAccountId,
			access_token: accessToken,
			refresh_token: refreshToken,
			expires_at: accessTokenExpires,
		} = {}) {
			const existingAcc = await findAccount(provider, providerAccountId);
			if (existingAcc) return;

			/** Build new account object. */
			const accObj = {
				_type: 'account',
				providerType: type,
				providerId: provider,
				providerAccountId: `${providerAccountId}`,
				accessToken,
				refreshToken,
				accessTokenExpires: `${accessTokenExpires}`,
				userId,
			};

			try {
				await sanity.create(accObj);
			} catch (error) {
				throw new Error('Failed to link account');
			}
		},

		/** Get linked user. */
		async getLinkedUser({ provider = '', providerAccountId = '' } = {}) {
			const existingAcc = await findAccount(provider, providerAccountId);
			if (!existingAcc || !existingAcc?.userId) return null;
			return getUser(existingAcc?.userId);
		},
	};
};

export default account;
