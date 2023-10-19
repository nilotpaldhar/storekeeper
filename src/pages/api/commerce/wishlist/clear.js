import clearWishlist from '@libs/commerce/wishlist/clearWishlist';
import validateReqMethod from '@utils/api/validateReqMethod';

const supportedMethods = ['POST'];

const handler = async (req, res) =>
	validateReqMethod(req, res, supportedMethods, async () => {
		try {
			const data = await clearWishlist(req, res);
			res.status(200).json({ success: true, data });
		} catch (error) {
			const message = error?.message || 'Something went wrong';
			res.status(500).json({ error: message });
		}
	});

export default handler;
