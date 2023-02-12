import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addCartDiscount, removeCartDiscount } from '@store/slices/cartOps/cartOps.thunks';

/** Components & Icons. */
import Summary from '@ui/data-display/Summary';
import TextField from '@ui/data-entry/TextField';
import RegularButton from '@ui/buttons/RegularButton';
import CloseIcon from '@icons/regular/Close';
import { useState } from 'react';

/**
 * Render the CartSummaryDiscount component.
 *
 * @return {Element} The CartSummaryDiscount component.
 */
const CartSummaryDiscount = ({ title, data, ...props }) => {
	const dispatch = useDispatch();
	const [discountCode, setDiscountCode] = useState('');

	/** Add discount. */
	const addDiscount = (evt) => {
		evt.preventDefault();
		dispatch(addCartDiscount(discountCode));
		setDiscountCode('');
	};

	return (
		<section {...props}>
			<Summary.SubTitle>{title}</Summary.SubTitle>
			{data && (
				<Summary.List className="!space-y-2 mb-5">
					<Summary.ListItem className="flex items-center space-x-1">
						<button
							type="button"
							onClick={() => dispatch(removeCartDiscount())}
							className="flex items-center text-neutral-900 hover:text-current hover:opacity-80"
						>
							<span className="sr-only">Remove Coupon</span>
							<CloseIcon className="!text-base" />
						</button>
						<div className="flex items-center space-x-1">
							<span className="font-medium">{data?.code}</span>
							<span className="text-neutral-500">is applied</span>
						</div>
					</Summary.ListItem>
				</Summary.List>
			)}
			{!data && (
				<form onSubmit={addDiscount}>
					<div className="flex items-center space-x-2 max-w-xl">
						<TextField
							required
							id="couponCode"
							value={discountCode}
							inputClassName="h-10"
							placeholder="Enter your code"
							onChange={(evt) => setDiscountCode(evt.target.value)}
						/>
						<RegularButton type="submit">Apply</RegularButton>
					</div>
				</form>
			)}
		</section>
	);
};

/**
 * Default Props.
 */
CartSummaryDiscount.defaultProps = {
	title: 'Promotion',
	data: null,
};

/**
 * Prop Types.
 */
CartSummaryDiscount.propTypes = {
	title: PropTypes.node,
	data: PropTypes.shape({
		type: PropTypes.string,
		code: PropTypes.string,
		value: PropTypes.string,
		productIds: PropTypes.arrayOf(PropTypes.string),
		amountSaved: PropTypes.shape({
			raw: PropTypes.number,
			formatted: PropTypes.string,
			formattedWithCode: PropTypes.string,
			formattedWithSymbol: PropTypes.string,
		}),
	}),
};

export default CartSummaryDiscount;
