import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { removeWishlistItem } from '@store/slices/wishlistOps/wishlistOps.thunks';

import Modal from '@ui/feedback/Modal';
import Image from '@ui/data-display/Image';
import RegularButton from '@ui/buttons/RegularButton';
import CartIcon from '@icons/regular/Cart';

const WishlistCardAction = dynamic(() => import('@ui/commerce/WishlistCard/Action'));

/**
 * Render the WishlistCardModal component.
 *
 * @return {Element} The WishlistCardModal component.
 */
const WishlistCardModal = ({ productIds, thumbnail, title, price, variants }) => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	/** Close modal and remove product from wishlist. */
	const handleCompleteAddToCart = useCallback(() => {
		setOpen(false);
		dispatch(removeWishlistItem(productIds?.sanity));
	}, [productIds?.sanity, dispatch]);

	const trigger = (
		<RegularButton fullWidth startIcon={CartIcon} intent="primary-ghost">
			<span className="truncate">Move To Cart</span>
		</RegularButton>
	);

	return (
		<Modal trigger={trigger} open={open} onOpenChange={setOpen}>
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
				<WishlistCardAction
					productIds={productIds}
					variants={variants}
					onComplete={handleCompleteAddToCart}
				/>
			</div>
		</Modal>
	);
};

/**
 * Default Props.
 */
WishlistCardModal.defaultProps = {
	variants: [],
};

/**
 * Prop Types.
 */
WishlistCardModal.propTypes = {
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
	variants: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
			options: PropTypes.arrayOf(PropTypes.shape({})),
		})
	),
};

export default WishlistCardModal;
