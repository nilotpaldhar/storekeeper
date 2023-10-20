import addItem from '@libs/commerce/wishlist/addItem';

import validateReqMethod from '@utils/api/validateReqMethod';
import isEmpty from 'lodash-es/isEmpty';

const supportedMethods = ['POST'];

const handler = async (req, res) =>
	validateReqMethod(req, res, supportedMethods, async () => {
		const itemId = req?.body?.item;

		if (isEmpty(itemId) || !itemId?.startsWith('product-prod_')) {
			res.status(422).json({
				error: 'The given data was invalid.',
			});
			return;
		}

		try {
			const data = await addItem(req, res, itemId);
			res.status(200).json({ success: true, data });
		} catch (error) {
			const message = error?.message || 'Something went wrong';
			res.status(500).json({ error: message });
		}
	});

export default handler;
