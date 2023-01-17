import PropTypes from 'prop-types';
import { Item, Trigger, Content } from '@radix-ui/react-navigation-menu';

/** Components */
import UserNavAction from '@ui/user/UserNavAction';
import HeaderIcon from '@ui/navigation/Header/HeaderIcon';

/** Icons. */
import UserIcon from '@icons/regular/User';

/** Helpers. */
import clsx from 'clsx';

/**
 * Render the ProfileAction component.
 *
 * @return {Element} The ProfileAction component.
 */
const ProfileAction = ({ className, ...props }) => (
	<Item className={clsx('relative', className)} {...props}>
		<Trigger asChild>
			<HeaderIcon
				title="Profile"
				icon={UserIcon}
				elementType="button"
				className="data-[state=open]:after:opacity-100 after:opacity-0 after:block after:w-[120%] after:h-[2px] after:bg-primary-600 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-opacity after:duration-75"
			/>
		</Trigger>
		<Content className="absolute z-10 w-64 transform -translate-x-1/2 bg-white border rounded rounded-t-none shadow top-full left-1/2 border-neutral-100">
			<div className="px-4 py-5">
				<UserNavAction />
			</div>
		</Content>
	</Item>
);

/**
 * Default Props.
 */
ProfileAction.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
ProfileAction.propTypes = {
	className: PropTypes.string,
};

export default ProfileAction;
