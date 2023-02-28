import user from '@libs/auth/user';
import checConfig from '@config/commerce';
import sanityConfig from '@config/sanity';
import protectedApiRoute from '@libs/auth/protectedApiRoute';

/** Update user details. */
const handler = async (req, res) => {
	const config = { sanity: sanityConfig, chec: checConfig };
	const checClient = checConfig({ useSecretKey: true });
	const sanityClient = sanityConfig({ useCdn: false, useToken: true });

	/** User data. */
	const payload = {
		email: req.body?.email,
		firstname: req.body?.firstname,
		lastname: req.body?.lastname,
		phone: req.body?.phone,
	};

	return protectedApiRoute(req, res, ['PUT'], async ({ email }) => {
		try {
			const { id: sanityId, checId } = await user(config).getByEmail(email);
			await sanityClient.patch(sanityId).set(payload).commit();
			const data = await checClient.request(`customers/${checId}`, 'put', payload);
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
			return res.status(500).json({ error: 'Failed to update user details.' });
		}
	});
};

export default handler;
