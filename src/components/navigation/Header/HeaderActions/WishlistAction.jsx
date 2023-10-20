import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchWishlist } from '@store/slices/wishlist/wishlist.thunks';
import { selectStatus } from '@store/slices/wishlist/wishlist.selectors';
import { HTTP_STATUS } from '@constants';

/** Components & Icons */
import { Item, Link as HeaderIconWrapper } from '@radix-ui/react-navigation-menu';
import HeaderIcon from '@ui/navigation/Header/HeaderIcon';
import HeartIcon from '@icons/regular/Heart';

/**
 * Render the WishlistAction component.
 *
 * @return {Element} The WishlistAction component.
 */
const WishlistAction = ({ ...props }) => {
	const dispatch = useDispatch();
	const status = useSelector(selectStatus);

	useEffect(() => {
		if (status === HTTP_STATUS.idle) {
			dispatch(fetchWishlist());
		}
	}, [dispatch, status]);

	return (
		<Item {...props}>
			<HeaderIconWrapper asChild>
				<HeaderIcon href="/wishlist" title="Wishlist" icon={HeartIcon} />
			</HeaderIconWrapper>
		</Item>
	);
};

export default WishlistAction;
