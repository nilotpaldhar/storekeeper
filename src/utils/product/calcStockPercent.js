import toNumber from 'lodash-es/toNumber';

/**
 * Calculates remaining stock percentage.
 *
 * @param {number} totalStock Total stock avilable.
 * @param {number} stockLeft Total stock left.
 */
const calcStockPercent = (totalStock = 0, stockLeft = 0) => {
	const stockPercent = ((stockLeft / totalStock) * 100).toFixed(0);
	return toNumber(stockPercent) ?? 0;
};

export default calcStockPercent;
