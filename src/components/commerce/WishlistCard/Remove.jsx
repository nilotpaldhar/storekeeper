import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { removeWishlistItem } from '@store/slices/wishlistOps/wishlistOps.thunks';

import CloseIcon from '@icons/regular/Close';

/**
 * Render the WishlistCardRemove component.
 *
 * @return {Element} The WishlistCardRemove component.
 */
const WishlistCardRemove = ({ productIds, onRemove }) => {
	const dispatch = useDispatch();

	const handleRemove = () => {
		dispatch(removeWishlistItem(productIds?.sanity));
		onRemove(productIds?.sanity);
	};

	return (
		<div className="absolute top-3 right-3">
			<button
				type="button"
				onClick={handleRemove}
				className="flex items-center justify-center p-1.5 bg-white text-neutral-900 rounded-full hover:text-current"
			>
				<CloseIcon className="!text-xs" />
				<span className="sr-only">Remove product from wishlist</span>
			</button>
		</div>
	);
};

/**
 * Default Props.
 */
WishlistCardRemove.defaultProps = {
	onRemove: () => {},
};

/**
 * Prop Types.
 */
WishlistCardRemove.propTypes = {
	productIds: PropTypes.shape({
		sanity: PropTypes.string,
		chec: PropTypes.string,
	}).isRequired,
	onRemove: PropTypes.func,
};

export default WishlistCardRemove;
