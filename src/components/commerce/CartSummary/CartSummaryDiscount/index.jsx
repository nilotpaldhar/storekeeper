import PropTypes from 'prop-types';
import Summary from '@ui/data-display/Summary';
import TextField from '@ui/data-entry/TextField';
import RegularButton from '@ui/buttons/RegularButton';
import CloseIcon from '@icons/regular/Close';

/**
 * Render the CartSummaryDiscount component.
 *
 * @return {Element} The CartSummaryDiscount component.
 */
const CartSummaryDiscount = ({ title, coupons, ...props }) => (
	<section {...props}>
		<Summary.SubTitle>{title}</Summary.SubTitle>
		{coupons?.length > 0 && (
			<Summary.List className="!space-y-2 mb-5">
				<Summary.ListItem className="flex items-center space-x-1">
					<button
						type="button"
						className="flex items-center text-neutral-900 hover:text-current hover:opacity-80"
					>
						<span className="sr-only">Remove Coupon</span>
						<CloseIcon className="!text-base" />
					</button>
					<div className="flex items-center space-x-1">
						<span className="font-medium">ST11MT60622</span>
						<span className="text-neutral-500">is applied</span>
					</div>
				</Summary.ListItem>
			</Summary.List>
		)}
		<form>
			<div className="flex items-center space-x-2 max-w-xl">
				<TextField id="couponCode" placeholder="Enter your coupon" inputClassName="h-10" />
				<RegularButton type="submit">Apply</RegularButton>
			</div>
		</form>
	</section>
);

/**
 * Default Props.
 */
CartSummaryDiscount.defaultProps = {
	title: 'Promotions',
	coupons: [],
};

/**
 * Prop Types.
 */
CartSummaryDiscount.propTypes = {
	title: PropTypes.node,
	coupons: PropTypes.arrayOf(PropTypes.shape({})),
};

export default CartSummaryDiscount;
