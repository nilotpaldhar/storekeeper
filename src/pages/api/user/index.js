import user from '@libs/auth/user';
import checConfig from '@config/commerce';
import sanityConfig from '@config/sanity';
import protectedApiRoute from '@libs/auth/protectedApiRoute';

/** Get authenticated user. */
const handler = async (req, res) => {
	const config = { sanity: sanityConfig, chec: checConfig };
	const checClient = checConfig({ useSecretKey: true });

	return protectedApiRoute(req, res, ['GET'], async ({ email }) => {
		try {
			const { id: sanityId, checId } = await user(config).getByEmail(email);
			const data = await checClient.request(`customers/${checId}`);
			return res.status(200).json({
				success: true,
				data: {
					sanityId,
					checId: data?.id,
					email: data?.email,
					phone: data?.phone,
					firstname: data?.firstname,
					lastname: data?.lastname,
				},
			});
		} catch (error) {
			return res.status(500).json({ error: 'Something went wrong' });
		}
	});
};

export default handler;
