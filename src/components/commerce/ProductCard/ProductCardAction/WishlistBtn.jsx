import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { HTTP_STATUS } from '@constants';

import { addWishlistItem, removeWishlistItem } from '@store/slices/wishlistOps/wishlistOps.thunks';
import { selectIsWishlisted } from '@store/slices/wishlist/wishlist.selectors';
import * as wishlistOpsSelectors from '@store/slices/wishlistOps/wishlistOps.selectors';

/** Icons. */
import HeartIcon from '@icons/regular/Heart';
import LoadingIcon from '@icons/regular/Loading';

/** Styles. */
import { btnStyles } from '@ui/commerce/ProductCard/ProductCardAction/styles.cva';

/**
 * Render the ProductCardAction component.
 *
 * @return {Element} The ProductCardAction component.
 */
const WishlistBtn = ({ productId }) => {
	const dispatch = useDispatch();

	const status = useSelector(wishlistOpsSelectors.selectStatus);
	const identifier = useSelector(wishlistOpsSelectors.selectIdentifier);
	const isWishlisted = useSelector((state) => selectIsWishlisted(state, productId));

	const loading = status === HTTP_STATUS.pending && identifier === productId;

	const handleAddToWishlist = () => {
		if (isWishlisted) {
			dispatch(removeWishlistItem(productId));
			return;
		}
		dispatch(addWishlistItem(productId));
	};

	return (
		<button
			type="button"
			tabIndex="-1"
			disabled={loading}
			onClick={handleAddToWishlist}
			className={btnStyles({ active: isWishlisted })}
		>
			{loading ? (
				<LoadingIcon className="!text-base animate-spin" />
			) : (
				<HeartIcon className="!text-base" />
			)}
			<span className="sr-only">add to wishlist</span>
		</button>
	);
};

/**
 * Default Props.
 */
WishlistBtn.defaultProps = {};

/**
 * Prop Types.
 */
WishlistBtn.propTypes = {
	productId: PropTypes.string.isRequired,
};

export default WishlistBtn;
