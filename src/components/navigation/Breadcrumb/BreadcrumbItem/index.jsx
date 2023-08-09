import PropTypes from 'prop-types';
import Anchor from '@ui/general/Anchor';
import SlashIcon from '@icons/regular/Slash';
import clsx from 'clsx';

/**
 * Render the BreadcrumbItem component.
 *
 * @return {Element} The BreadcrumbItem component.
 */
const BreadcrumbItem = ({ label, href, divider: Divider, currentPage, ...props }) => (
	<div
		className={clsx(
			'flex items-center text-neutral-900 text-sm lg:text-base',
			currentPage && 'text-primary-600'
		)}
		{...props}
	>
		<Anchor
			href={href}
			className={clsx(
				'text-current font-normal hover:text-neutral-900',
				currentPage && 'font-semibold hover:text-primary-600'
			)}
		>
			{label}
		</Anchor>
		{!currentPage && <Divider className="!text-sm lg:!text-base mx-1" />}
	</div>
);

/**
 * Default Props.
 */
BreadcrumbItem.defaultProps = {
	divider: SlashIcon,
	currentPage: false,
};

/**
 * Prop Types.
 */
BreadcrumbItem.propTypes = {
	label: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired,
	divider: PropTypes.elementType,
	currentPage: PropTypes.bool,
};

export default BreadcrumbItem;
