import PropTypes from 'prop-types';
import Box from '@ui/data-display/Box';

import DashIcon from '@icons/regular/Dash';
import PlusIcon from '@icons/regular/Plus';
import MinusIcon from '@icons/regular/Minus';

/**
 * Render the PriceRecap component.
 *
 * @return {Element} The PriceRecap component.
 */
const PriceRecap = ({
	subTotal,
	grandTotal,
	shipping,
	discount,
	tax,
	hideTaxIfEmpty,
	...props
}) => (
	<div {...props}>
		<Box.Block className="px-3 lg:px-5">
			<ul className="flex flex-col space-y-4">
				<li className="flex justify-between items-center">
					<span>Subtotal</span>
					{subTotal ? <mark className="font-normal bg-transparent">{subTotal}</mark> : <DashIcon />}
				</li>
				{shipping && (
					<li className="flex justify-between items-center">
						<span>Shipping Cost</span>
						<span className="flex items-center space-x-1 font-normal text-error-600">
							<PlusIcon className="!text-xs" />
							<mark className="text-current bg-transparent">{shipping}</mark>
						</span>
					</li>
				)}
				{discount && (
					<li className="flex justify-between items-center">
						<span>Coupon Discount</span>
						<span className="flex items-center space-x-1 font-normal text-success-600">
							<MinusIcon className="!text-xs" />
							<mark className="text-current bg-transparent">{discount}</mark>
						</span>
					</li>
				)}
			</ul>
		</Box.Block>
		<Box.Divider />
		<Box.Block className="px-3 lg:px-5 py-3">
			<div className="flex justify-between">
				<div className="flex items-center flex-wrap gap-1">
					<span className="text-sm font-semibold">Total Price</span>
					{tax && <span className="text-xs font-light">&#40;includes {tax} tax&#41;</span>}
					{!tax && !hideTaxIfEmpty && (
						<span className="text-xs font-light">&#40;including taxes&#41;</span>
					)}
				</div>
				<mark className="text-sm font-semibold bg-transparent">{grandTotal}</mark>
			</div>
		</Box.Block>
	</div>
);

/**
 * Default Props.
 */
PriceRecap.defaultProps = {
	subTotal: '',
	grandTotal: '',
	shipping: '',
	discount: '',
	tax: '',
	hideTaxIfEmpty: true,
};

/**
 * Prop Types.
 */
PriceRecap.propTypes = {
	subTotal: PropTypes.string,
	grandTotal: PropTypes.string,
	shipping: PropTypes.string,
	discount: PropTypes.string,
	tax: PropTypes.string,
	hideTaxIfEmpty: PropTypes.bool,
};

export default PriceRecap;
