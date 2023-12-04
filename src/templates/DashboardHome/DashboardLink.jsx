import PropTypes from 'prop-types';
import Anchor from '@ui/general/Anchor';
import ChevronRightIcon from '@icons/regular/ChevronRight';
import { clsx } from 'clsx';

/**
 * Render the DashboardLink component.
 *
 * @return {Element} The DashboardLink component.
 */
const DashboardLink = ({ href, icon: Icon, title, description, ...props }) => (
	<Anchor
		href={href}
		className={clsx(
			'flex items-center w-full px-3 py-4 space-x-4',
			'border border-neutral-100 transition duration-300 hover:bg-neutral-50/50',
			'lg:flex-col lg:justify-center lg:space-x-0 lg:space-y-3 lg:h-full lg:p-3.5'
		)}
		{...props}
	>
		{Icon && <Icon className="!text-xl !text-neutral-500" />}
		<div
			className={clsx(
				'flex-1 flex flex-col space-y-1 justify-center leading-none',
				'lg:flex-initial lg:space-y-2 lg:items-center lg:text-center'
			)}
		>
			<span className="block text-sm font-semibold text-neutral-900">{title}</span>
			<span className="block text-xs font-light text-neutral-500">{description}</span>
		</div>
		<ChevronRightIcon className="lg:!hidden !text-xs !text-neutral-500" />
	</Anchor>
);

/**
 * Default Props.
 */
DashboardLink.defaultProps = {
	href: null,
	icon: null,
	title: '',
	description: '',
};

/**
 * Prop Types.
 */
DashboardLink.propTypes = {
	href: PropTypes.string,
	icon: PropTypes.elementType,
	title: PropTypes.string,
	description: PropTypes.string,
};

export default DashboardLink;
