import { Item, Link as HeaderIconWrapper } from '@radix-ui/react-navigation-menu';

/** Components */
import HeaderIcon from '@ui/navigation/Header/HeaderIcon';

/** Icons. */
import HeartIcon from '@icons/regular/Heart';

/**
 * Render the WishlistAction component.
 *
 * @return {Element} The WishlistAction component.
 */
const WishlistAction = ({ ...props }) => (
	<Item {...props}>
		<HeaderIconWrapper asChild>
			<HeaderIcon href="#" title="Wishlist" icon={HeartIcon} />
		</HeaderIconWrapper>
	</Item>
);

export default WishlistAction;
