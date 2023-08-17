import PropTypes from 'prop-types';

import calcStockPercent from '@utils/product/calcStockPercent';
import clsx from 'clsx';

/**
 * Render the StockProgress component.
 *
 * @return {Element} The StockProgress component.
 */
const StockProgress = ({ totalStock, totalSales, stockLeft, className, ...props }) => {
	const stockPercent = calcStockPercent(totalStock, stockLeft);

	return (
		<div className={clsx('flex flex-col space-y-2', className)} {...props}>
			<div className="flex items-center justify-between text-sm font-light px-1">
				<div className="flex items-center space-x-1">
					<span>Available:</span>
					<span className="font-semibold">{stockLeft}</span>
				</div>
				<div className="flex items-center space-x-1">
					<span>Already Sold:</span>
					<span className="font-semibold">{totalSales}</span>
				</div>
			</div>
			<div>
				<div className="w-full h-5 bg-neutral-200 rounded-full overflow-hidden">
					<div className="bg-primary-600 h-full" style={{ width: `${stockPercent}%` }} />
				</div>
			</div>
		</div>
	);
};

/**
 * Default Props.
 */
StockProgress.defaultProps = {
	totalSales: 0,
	stockLeft: 0,
	className: '',
};

/**
 * Prop Types.
 */
StockProgress.propTypes = {
	totalStock: PropTypes.number.isRequired,
	totalSales: PropTypes.number,
	stockLeft: PropTypes.number,
	className: PropTypes.string,
};

export default StockProgress;
