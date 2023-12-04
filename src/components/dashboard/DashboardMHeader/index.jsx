import PropTypes from 'prop-types';
import Anchor from '@ui/general/Anchor';
import ArrowLeftIcon from '@icons/regular/ArrowLeft';
import { clsx } from 'clsx';

/**
 * Render the DashboardMHeader component.
 *
 * @return {Element} The DashboardMHeader component.
 */
const DashboardMHeader = ({ href, children }) => (
	<header className={clsx('md:hidden mb-6 flex items-center space-x-3')}>
		<Anchor
			href={href}
			className="flex justify-center items-center text-neutral-900 hover:text-current"
		>
			<ArrowLeftIcon className="!text-base" />
			<span className="sr-only">Go Back</span>
		</Anchor>
		<div className="text-lg font-bold text-neutral-900 leading-none">{children}</div>
	</header>
);

/**
 * Default Props.
 */
DashboardMHeader.defaultProps = {
	children: '',
};

/**
 * Prop Types.
 */
DashboardMHeader.propTypes = {
	href: PropTypes.string.isRequired,
	children: PropTypes.node,
};

export default DashboardMHeader;
