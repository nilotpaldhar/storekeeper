import { nanoid } from 'nanoid';
import { groq } from 'next-sanity';
import getSanityClient from '@config/sanity';
import validateWebhookReq from '@utils/webhook/validateWebhookReq';

/** Initialize sanity client. */
const sanity = getSanityClient({ useCdn: false, useToken: true });

const handler = async (req, res) => {
	/** Supported methods & events. */
	const options = {
		supportedMethods: ['POST'],
		supportedEvents: ['orders.create'],
	};

	return validateWebhookReq(req, res, options, async ({ method: reqMethod }) => {
		/** Handle event: "orders.create". */
		const customer = req.body?.payload?.customer;

		if (!customer || !customer?.id) {
			return res.status(422).json({
				method: reqMethod,
				error: 'Invalid customer data',
			});
		}

		const query = groq`*[_type == "user" && checId == $checId]{ ... }[0]`;
		const existingUser = await sanity.fetch(query, { checId: customer?.id });

		/** Sync user with sanity. */
		if (!existingUser) {
			const userObj = {
				_id: `user.${nanoid()}`,
				checId: customer?.id,
				_type: 'user',
				firstname: customer?.firstname,
				lastname: customer?.lastname,
				email: customer?.email,
				phone: customer?.phone,
			};

			await sanity.create(userObj);
		}

		return res.status(200).json({
			success: true,
			data: existingUser,
			message: 'Order webhook event received',
		});
	});
};

export default handler;
