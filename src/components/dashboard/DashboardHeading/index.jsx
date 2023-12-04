import PropTypes from 'prop-types';
import { clsx } from 'clsx';

/**
 * Render the DashboardHeading component.
 *
 * @return {Element} The DashboardHeading component.
 */
const DashboardHeading = ({ as: Component, className, children, ...props }) => (
	<Component
		className={clsx('text-base md:text-lg font-normal text-neutral-900 leading-snug', className)}
		{...props}
	>
		{children}
	</Component>
);

/**
 * Default Props.
 */
DashboardHeading.defaultProps = {
	as: 'h2',
	className: '',
	children: '',
};

/**
 * Prop Types.
 */
DashboardHeading.propTypes = {
	as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
	className: PropTypes.string,
	children: PropTypes.node,
};

export default DashboardHeading;
