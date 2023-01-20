// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@pages/api/auth/[...nextauth]';

/** Redirect/restrict the authenticated users from accessing the current page. */
const redirectAuthUser = async (req, res, callback = () => {}) => {
	const session = await unstable_getServerSession(req, res, authOptions);
	if (session && session?.user) {
		return {
			redirect: {
				permanent: false,
				destination: '/',
			},
		};
	}
	return callback();
};

export default redirectAuthUser;
