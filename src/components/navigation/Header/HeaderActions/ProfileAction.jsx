import PropTypes from 'prop-types';
import { Item, Trigger, Content } from '@radix-ui/react-navigation-menu';

/** Components */
import HeaderIcon from '@ui/navigation/Header/HeaderIcon';

/** Icons. */
import UserIcon from '@icons/regular/User';
import LockIcon from '@icons/regular/Lock';

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
				<div className="flex flex-col space-y-2">
					<h4 className="text-sm font-bold leading-none">Welcome</h4>
					<p className="text-xs font-light leading-none">To access your account & manage orders</p>
				</div>
				<button
					type="button"
					className="flex items-center justify-center w-full py-3 mt-3 space-x-2 text-center text-white bg-primary-600 hover:bg-primary-500 hover:text-white"
				>
					<LockIcon className="!text-sm" />
					<span className="text-sm leading-none">Login / Register</span>
				</button>
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
