import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HTTP_STATUS } from '@constants';
import { fetchCart } from '@store/slices/cart/cart.thunks';
import { selectStatus, selectCount } from '@store/slices/cart/cart.selectors';

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

	const count = useSelector(selectCount);
	const status = useSelector(selectStatus);

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
