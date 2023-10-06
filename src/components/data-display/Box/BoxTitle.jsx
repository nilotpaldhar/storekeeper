import PropTypes from 'prop-types';
import { clsx } from 'clsx';

/**
 * Render the BoxTitle component.
 *
 * @return {Element} The BoxTitle component.
 */
const BoxTitle = ({ as: Component, children, className, ...props }) => (
	<Component
		className={clsx(
			'text-sm font-semibold text-current px-5 py-3 border-b border-dashed border-neutral-100',
			className
		)}
		{...props}
	>
		{children}
	</Component>
);

/**
 * Default Props.
 */
BoxTitle.defaultProps = {
	as: 'h1',
	children: '',
	className: '',
};

/**
 * Prop Types.
 */
BoxTitle.propTypes = {
	as: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
};

export default BoxTitle;
