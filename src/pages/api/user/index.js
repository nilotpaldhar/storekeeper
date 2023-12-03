import protectedApiRoute from '@libs/auth/protectedApiRoute';

/** Get authenticated user. */
const handler = async (req, res) =>
	protectedApiRoute(req, res, ['GET'], async (user) => {
		try {
			return res.status(200).json({
				success: true,
				data: user,
			});
		} catch (error) {
			return res.status(500).json({ error: 'Something went wrong' });
		}
	});

export default handler;
