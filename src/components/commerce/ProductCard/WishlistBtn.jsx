import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '@store/slices/wishlistOps/wishlistOps.thunks';
import { selectIsWishlisted } from '@store/slices/wishlist/wishlist.selectors';
import { selectIsPending } from '@store/slices/wishlistOps/wishlistOps.selectors';

import LoadingIcon from '@icons/regular/Loading';
import HeartFillIcon from '@icons/regular/HeartFill';

import { wishlistStyles } from './styles.cva';

/**
 * Render the WishlistBtn component.
 *
 * @return {Element} The WishlistBtn component.
 */
const WishlistBtn = ({ id }) => {
	const dispatch = useDispatch();

	const loading = useSelector((state) => selectIsPending(state, id));
	const active = useSelector((state) => selectIsWishlisted(state, id));

	const handleClick = () => {
		if (active) {
			dispatch(actions.removeWishlistItem(id));
			return;
		}
		dispatch(actions.addWishlistItem(id));
	};

	return (
		<button type="button" onClick={handleClick} className={wishlistStyles({ active })}>
			{loading ? (
				<LoadingIcon className="!text-xl animate-spin" />
			) : (
				<HeartFillIcon className="!text-xl" />
			)}
			<span className="sr-only">Add to wishlist</span>
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
	id: PropTypes.string.isRequired,
};

export default WishlistBtn;
