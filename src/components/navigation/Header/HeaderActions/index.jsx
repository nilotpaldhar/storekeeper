import PropTypes from 'prop-types';
import { Root, List } from '@radix-ui/react-navigation-menu';

/** Components */
import ProfileAction from '@ui/navigation/Header/HeaderActions/ProfileAction';
import WishlistAction from '@ui/navigation/Header/HeaderActions/WishlistAction';
import CartAction from '@ui/navigation/Header/HeaderActions/CartAction';

/** Helpers. */
import clsx from 'clsx';

/**
 * Render the HeaderActions component.
 *
 * @return {Element} The HeaderActions component.
 */
const HeaderActions = ({ className, ...props }) => (
	<Root asChild>
		<div className={clsx('h-full [&>div]:h-full', className)} {...props}>
			<List className="h-full [&>li]:h-full flex items-center lg:space-x-6">
				<ProfileAction className="hidden lg:block" />
				<WishlistAction className="mr-2 sm:mr-4 lg:mr-0" />
				<CartAction />
			</List>
		</div>
	</Root>
);

/**
 * Default Props.
 */
HeaderActions.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
HeaderActions.propTypes = {
	className: PropTypes.string,
};

export default HeaderActions;
