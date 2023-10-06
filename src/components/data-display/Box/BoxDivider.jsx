import PropTypes from 'prop-types';
import { clsx } from 'clsx';

/**
 * Render the BoxDivider component.
 *
 * @return {Element} The BoxDivider component.
 */
const BoxDivider = ({ className, ...props }) => (
	<div
		role="separator"
		className={clsx('border-t border-dashed border-neutral-100', className)}
		{...props}
	/>
);

/**
 * Default Props.
 */
BoxDivider.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
BoxDivider.propTypes = {
	className: PropTypes.string,
};

export default BoxDivider;
