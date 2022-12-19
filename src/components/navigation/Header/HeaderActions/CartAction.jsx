import { Item, Link as HeaderIconWrapper } from '@radix-ui/react-navigation-menu';

/** Components */
import HeaderIcon from '@ui/navigation/Header/HeaderIcon';

/** Icons. */
import BagIcon from '@icons/regular/Bag';

/**
 * Render the CartAction component.
 *
 * @return {Element} The CartAction component.
 */
const CartAction = ({ ...props }) => (
	<Item {...props}>
		<HeaderIconWrapper asChild>
			<HeaderIcon href="#" title="Cart" icon={BagIcon} count={5} />
		</HeaderIconWrapper>
	</Item>
);

export default CartAction;
