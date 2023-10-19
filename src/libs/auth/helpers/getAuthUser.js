import { getServerSession } from 'next-auth';
import { authOptions } from '@pages/api/auth/[...nextauth]';
import isEmpty from 'lodash-es/isEmpty';

/**
 * Get authenticated user.
 */
const getAuthUser = async (req, res) => {
	const session = await getServerSession(req, res, authOptions);
	const { user: { email = null } = {} } = session || {};
	const isAuthenticated = !isEmpty(session) && !isEmpty(email);
	return { email, isAuthenticated };
};

export default getAuthUser;
