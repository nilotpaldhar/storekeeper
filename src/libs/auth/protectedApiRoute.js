import { getServerSession } from 'next-auth/next';
import { authOptions } from '@pages/api/auth/[...nextauth]';
import validateReqMethod from '@utils/api/validateReqMethod';
import getCurrentUser from '@libs/auth/helpers/getCurrentUser';

/** Protect api route from unauthenticated users. */
const protectedApiRoute = async (req, res, supportedMethods, callback = () => {}) =>
	validateReqMethod(req, res, supportedMethods, async (reqMethod) => {
		try {
			const session = await getServerSession(req, res, authOptions);
			if (!session || !session?.user) {
				return res.status(401).json({ error: 'Unauthenticated' });
			}

			const user = await getCurrentUser(session?.user?.email);
			return callback(user || {}, reqMethod);
		} catch (error) {
			return res.status(500).json({ error: 'Something went wrong' });
		}
	});

export default protectedApiRoute;
