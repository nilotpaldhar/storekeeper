import validateReqMethod from '@utils/api/validateReqMethod';
import getWishlistData from '@libs/commerce/wishlist/getWishlistData';

const supportedMethods = ['GET'];

const handler = async (req, res) =>
	validateReqMethod(req, res, supportedMethods, async () => {
		try {
			const wishlist = await getWishlistData(req, res);
			res.status(200).json({ success: true, data: wishlist });
		} catch (error) {
			const message = error?.message || 'Something went wrong';
			res.status(500).json({ error: message });
		}
	});

export default handler;
