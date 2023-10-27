import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { selectIsPending } from '@store/slices/cartOps/cartOps.selectors';

import Modal from '@ui/feedback/Modal';
import Image from '@ui/data-display/Image';
import RegularButton from '@ui/buttons/RegularButton';
import ProductActions from '@ui/commerce/ProductActions';

import CartIcon from '@icons/regular/Cart';

/**
 * Render the MoveToCart component.
 *
 * @return {Element} The MoveToCart component.
 */
const MoveToCart = ({ productIds, thumbnail, title, price, variants, onComplete }) => {
	const [open, setOpen] = useState(false);
	const isPending = useSelector((state) => selectIsPending(state, productIds.chec));

	const handleOpenChange = (val) => {
		if (isPending) return;
		setOpen(val);
	};

	const handleMoveToCart = useCallback(() => {
		setOpen(false);
		onComplete();
	}, [onComplete]);

	const trigger = (
		<RegularButton
			fullWidth
			startIcon={CartIcon}
			intent="primary-ghost"
			onClick={() => setOpen(true)}
		>
			<span className="block w-full truncate">Move To Cart</span>
		</RegularButton>
	);

	return (
		<Modal trigger={trigger} open={open} onOpenChange={handleOpenChange}>
			<div className="flex flex-col space-y-6">
				<div className="flex items-start space-x-4 pb-4 border-b border-neutral-100 pr-4">
					<div className="shrink-0 w-20 bg-neutral-50">
						<Image src={thumbnail} alt={title} width={80} height={80} />
					</div>
					<div className="text-sm pt-1">
						<h3 className="font-medium leading-snug">{title}</h3>
						<p className="font-bold mt-2">
							<data value={price?.raw}>{price?.formattedWithSymbol}</data>
						</p>
					</div>
				</div>
				<ProductActions
					productIds={productIds}
					variants={variants}
					cartBtnIcon={null}
					cartBtnText="Done"
					hideWishlistBtn
					onSuccessAddToCart={handleMoveToCart}
				/>
			</div>
		</Modal>
	);
};

/**
 * Default Props.
 */
MoveToCart.defaultProps = {
	variants: [],
	onComplete: () => {},
};

/**
 * Prop Types.
 */
MoveToCart.propTypes = {
	productIds: PropTypes.shape({
		sanity: PropTypes.string,
		chec: PropTypes.string,
	}).isRequired,
	thumbnail: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	price: PropTypes.shape({
		raw: PropTypes.number,
		formattedWithSymbol: PropTypes.string,
	}).isRequired,
	variants: PropTypes.arrayOf(PropTypes.shape({})),
	onComplete: PropTypes.func,
};

export default MoveToCart;
