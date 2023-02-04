import PropTypes from 'prop-types';

/**
 * Render the CartListHeading component.
 *
 * @return {Element} The CartListHeading component.
 */
const CartListHeading = ({ symbol }) => {
	const textClassName = 'text-xs font-bold leading-none uppercase text-neutral-900';

	return (
		<div className="hidden lg:grid grid-cols-12 gap-6 p-5 bg-neutral-50">
			<div className="col-span-4 flex">
				<span className={textClassName}>Product</span>
			</div>
			<div className="col-span-2 flex items-center space-x-1">
				<span className={textClassName}>Price</span>
				{symbol && <span className={textClassName}>&#40;{symbol}&#41;</span>}
			</div>
			<div className="col-span-2 flex">
				<span className={textClassName}>Quantity</span>
			</div>
			<div className="col-span-2 flex items-center space-x-1">
				<span className={textClassName}>Total</span>
				{symbol && <span className={textClassName}>&#40;{symbol}&#41;</span>}
			</div>
		</div>
	);
};

/**
 * Default Props.
 */
CartListHeading.defaultProps = {
	symbol: null,
};

/**
 * Prop Types.
 */
CartListHeading.propTypes = {
	symbol: PropTypes.string,
};

export default CartListHeading;
