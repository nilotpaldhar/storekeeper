import user from '@libs/auth/user';
import checConfig from '@config/commerce';
import sanityConfig from '@config/sanity';

const config = { sanity: sanityConfig, chec: checConfig };

/**
 * Get current authenticated user by email.
 */
const getUserByEmail = async (email) => {
	try {
		const data = await user(config).getByEmail(email);
		return data;
	} catch (error) {
		throw new Error('User not found');
	}
};

export default getUserByEmail;
