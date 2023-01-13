import user from '@libs/auth/user';
import account from '@libs/auth/account';
import verificationToken from '@libs/auth/token';

/** Next-Auth adapter for "sanity" & "commerce.js". */
export const ChecSanityAdapter = (client = {}) => {
	if (!client || !client?.sanity || !client?.chec) {
		throw new Error(`One or more api clients are missing`);
	}

	return {
		/* ------------------- User ------------------- */
		createUser: user(client).create,
		updateUser: user(client).update,
		getUser: user(client).get,
		getUserByEmail: user(client).getByEmail,
		deleteUser: () => {}, // unimplemented

		/* ------------------- Account ------------------- */
		linkAccount: account(client).linkUser,
		unlinkAccount: () => {}, // unimplemented
		getUserByAccount: account(client).getLinkedUser,

		/* ------------------- Session ------------------- */
		createSession: async () => ({}), // unimplemented
		updateSession: async () => ({}), // unimplemented
		deleteSession: async () => {}, // unimplemented
		getSessionAndUser: async () => ({}), // unimplemented

		/* ------------------- Verification Token ------------------- */
		createVerificationToken: verificationToken(client).createToken,
		useVerificationToken: verificationToken(client).useToken,
	};
};

export default ChecSanityAdapter;
