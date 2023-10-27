import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { selectIsWishlisted } from '@store/slices/wishlist/wishlist.selectors';
import { selectIsPending } from '@store/slices/wishlistOps/wishlistOps.selectors';

import RegularButton from '@ui/buttons/RegularButton';
import HeartIcon from '@icons/regular/Heart';
import HeartFillIcon from '@icons/regular/HeartFill';

import { clsx } from 'clsx';

/**
 * Render the WishlistBtn component.
 *
 * @return {Element} The WishlistBtn component.
 */
const WishlistBtn = ({ id, onAddToWishlist }) => {
	const loading = useSelector((state) => selectIsPending(state, id));
	const active = useSelector((state) => selectIsWishlisted(state, id));

	return (
		<RegularButton
			fullWidth
			loading={loading}
			onClick={onAddToWishlist}
			intent="dark-ghost"
			startIcon={active ? HeartFillIcon : HeartIcon}
			className={clsx('!px-14 border border-neutral-200', active && '!text-error-600')}
		>
			<span className="w-full truncate text-neutral-900 font-semibold">
				{active ? 'Wishlisted' : 'Wishlist'}
			</span>
		</RegularButton>
	);
};

/**
 * Default Props.
 */
WishlistBtn.defaultProps = {
	onAddToWishlist: () => {},
};

/**
 * Prop Types.
 */
WishlistBtn.propTypes = {
	id: PropTypes.string.isRequired,
	onAddToWishlist: PropTypes.func,
};

export default WishlistBtn;
