import checConfig from '@config/commerce';
import sanityConfig from '@config/sanity';
import protectedApiRoute from '@libs/auth/protectedApiRoute';

import { ValidationError } from 'yup';
import { infoValidator } from '@libs/validation/user';

const checClient = checConfig({ useSecretKey: true });
const sanityClient = sanityConfig({ useCdn: false, useToken: true });

/** Update authenticated user info. */
const handler = async (req, res) =>
	protectedApiRoute(req, res, ['PATCH'], async (user) => {
		try {
			const payload = await infoValidator.validate(req?.body, {
				stripUnknown: true,
			});

			const data = await Promise.all([
				sanityClient.patch(user?.sanityId).set(payload).commit(),
				checClient.request(`customers/${user?.checId}`, 'put', payload),
			]);

			return res.status(200).json({
				success: true,
				data: {
					// eslint-disable-next-line no-underscore-dangle
					sanityId: data[0]?._id,
					checId: data[0]?.checId,
					email: data[0]?.email,
					firstname: data[0]?.firstname,
					lastname: data[0]?.lastname,
					phone: data[0]?.phone,
				},
			});
		} catch (error) {
			if (error instanceof ValidationError) {
				return res.status(422).json({ error: 'Invalid data' });
			}

			const statusCode = error?.statusCode || 500;
			const message = error?.data?.error?.message || 'Something went wrong';

			return res.status(statusCode).json({
				error: message,
			});
		}
	});

export default handler;
