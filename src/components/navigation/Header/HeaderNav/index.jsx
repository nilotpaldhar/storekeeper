import PropTypes from 'prop-types';
import {
	Root,
	List,
	Item,
	Viewport,
	Link as HeaderLinkWrapper,
} from '@radix-ui/react-navigation-menu';

/** Components */
import HeaderLink from '@ui/navigation/Header/HeaderLink';
import HeaderDropdown from '@ui/navigation/Header/HeaderDropdown';

/** Helpers. */
import clsx from 'clsx';

/**
 * Render the HeaderNav component.
 *
 * @return {Element} The HeaderNav component.
 */
const HeaderNav = ({ items, className, ...props }) =>
	items?.length > 0 ? (
		<Root
			delayDuration={100}
			className={clsx('relative h-full [&>div]:h-full', className)}
			{...props}
		>
			<List className="h-full [&>li]:h-full flex flex-wrap items-center space-x-8 xl:space-x-10">
				{items?.map((item) =>
					item?.type === 'navDropdown' ? (
						<HeaderDropdown key={item?.id} data={item} />
					) : (
						<Item key={item?.id} className="flex items-center">
							<HeaderLinkWrapper asChild>
								<HeaderLink data={item} />
							</HeaderLinkWrapper>
						</Item>
					)
				)}
			</List>
			<Viewport />
		</Root>
	) : null;

/**
 * Default Props.
 */
HeaderNav.defaultProps = {
	items: [],
	className: '',
};

/**
 * Prop Types.
 */
HeaderNav.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({})),
	className: PropTypes.string,
};

export default HeaderNav;
