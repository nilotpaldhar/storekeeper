import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCartDiscount, removeCartDiscount } from '@store/slices/cart/cart.thunks';

/** Components & Icons. */
import TextField from '@ui/data-entry/TextField';
import RegularButton from '@ui/buttons/RegularButton';
import TagsIcon from '@icons/regular/Tags';
import CloseIcon from '@icons/regular/Close';

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
		<div className="flex flex-col space-y-4" {...props}>
			<div className="flex items-center space-x-1">
				<TagsIcon className="!text-base -rotate-90" />
				<span className="text-sm font-semibold">{title}</span>
			</div>
			{data && (
				<div className="flex items-center space-x-2">
					<button
						type="button"
						onClick={() => dispatch(removeCartDiscount())}
						className="flex items-center text-neutral-900 hover:text-current hover:opacity-80"
					>
						<span className="sr-only">Remove Coupon</span>
						<CloseIcon className="!text-base" />
					</button>
					<div className="flex items-center space-x-1 text-xs">
						<span className="font-normal">{data?.code}</span>
						<span className="text-neutral-500">is applied</span>
					</div>
				</div>
			)}
			{!data && (
				<div>
					<form onSubmit={addDiscount}>
						<div className="flex items-start space-x-1 max-w-xs">
							<TextField
								required
								id="couponCode"
								value={discountCode}
								inputClassName="h-8"
								placeholder="Enter your code"
								onChange={(evt) => setDiscountCode(evt.target.value)}
							/>
							<RegularButton type="submit" className="!min-h-[32px]">
								Apply
							</RegularButton>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

/**
 * Default Props.
 */
CartSummaryDiscount.defaultProps = {
	title: 'Promotions',
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
