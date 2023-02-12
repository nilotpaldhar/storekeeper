import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '@store/slices/cart/cart.thunks';
import { selectCartStatus, selectCartCount } from '@store/slices/cart/cart.selectors';
import { HTTP_STATUS } from '@constants';

/** Components */
import { Item, Link as HeaderIconWrapper } from '@radix-ui/react-navigation-menu';
import HeaderIcon from '@ui/navigation/Header/HeaderIcon';

/** Icons. */
import BagIcon from '@icons/regular/Bag';

/**
 * Render the CartAction component.
 *
 * @return {Element} The CartAction component.
 */
const CartAction = ({ ...props }) => {
	const dispatch = useDispatch();
	const count = useSelector(selectCartCount);
	const status = useSelector(selectCartStatus);

	useEffect(() => {
		if (status === HTTP_STATUS.idle) {
			dispatch(fetchCart());
		}
	}, [dispatch, status]);

	return (
		<Item {...props}>
			<HeaderIconWrapper asChild>
				<HeaderIcon href="/cart" title="Cart" icon={BagIcon} count={count} />
			</HeaderIconWrapper>
		</Item>
	);
};

export default CartAction;
