import { groq } from 'next-sanity';

export const verificationToken = (client) => {
	const sanity = client?.sanity({ useCdn: false });

	/** Find verification token. */
	const findToken = async (identifier = '', token = '') => {
		const query = groq`*[
			_type == "verificationToken" && identifier == $identifier && token == $token
		]{ "id":_id, identifier, token, expires}[0]`;

		try {
			const foundToken = await sanity.fetch(query, { identifier, token });
			return foundToken ?? null;
		} catch (error) {
			return null;
		}
	};

	return {
		/** Create verification token. */
		async createToken({ identifier, token, expires } = {}) {
			const existingToken = await findToken(identifier, token);
			if (existingToken) await sanity.delete(existingToken?.id);

			if (!identifier || !token || !expires) {
				throw new Error('Missing one or more parameters');
			}

			/** Build new token object. */
			const tokenObj = { _type: 'verificationToken', identifier, token, expires };

			try {
				const newToken = await sanity.create(tokenObj);
				return newToken;
			} catch (error) {
				throw new Error('Failed to create verification token');
			}
		},

		/** Use verification token. */
		async useToken({ identifier, token } = {}) {
			const existingToken = await findToken(identifier, token);
			if (!existingToken) return null;

			try {
				await sanity.delete(existingToken?.id);
				return existingToken;
			} catch (error) {
				return null;
			}
		},
	};
};

export default verificationToken;
