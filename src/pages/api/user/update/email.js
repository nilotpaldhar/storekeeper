import checConfig from '@config/commerce';
import sanityConfig from '@config/sanity';
import protectedApiRoute from '@libs/auth/protectedApiRoute';

import { ValidationError } from 'yup';
import { emailValidator } from '@libs/validation/user';

const checClient = checConfig({ useSecretKey: true });
const sanityClient = sanityConfig({ useCdn: false, useToken: true });

/** Update authenticated user email address. */
const handler = async (req, res) =>
	protectedApiRoute(req, res, ['PATCH'], async (user) => {
		try {
			const payload = await emailValidator.validate(req?.body, {
				stripUnknown: true,
			});

			await checClient.request(`customers/${user?.checId}`, 'put', payload);
			const data = await sanityClient.patch(user?.sanityId).set(payload).commit();

			return res.status(200).json({
				success: true,
				data: {
					// eslint-disable-next-line no-underscore-dangle
					sanityId: data?._id,
					checId: data?.checId,
					email: data?.email,
					firstname: data?.firstname,
					lastname: data?.lastname,
					phone: data?.phone,
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
