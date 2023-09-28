import axios from 'axios';

/**
 * Checks product inventory.
 *
 * @param {string} productId Product ID.
 */
const checkInventory = async (productId) => {
	try {
		const res = await axios.post('/api/commerce/product/inventory', { productId });
		return {
			inventory: res?.data?.data?.inventory,
			status: res.data?.data?.outOfStock ? 'OUT_OF_STOCK' : 'IN_STOCK',
			error: '',
		};
	} catch (error) {
		return {
			inventory: null,
			status: 'UNKNOWN',
			error: 'Something went wrong. Please reload',
		};
	}
};

export default checkInventory;
