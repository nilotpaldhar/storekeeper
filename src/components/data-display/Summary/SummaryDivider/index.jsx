import PropTypes from 'prop-types';
import { clsx } from 'clsx';

/**
 * Render the SummaryDivider component.
 *
 * @return {Element} The SummaryDivider component.
 */
const SummaryDivider = ({ className, ...props }) => (
	<div role="separator" className={clsx('border-t border-neutral-50', className)} {...props} />
);

/**
 * Default Props.
 */
SummaryDivider.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
SummaryDivider.propTypes = {
	className: PropTypes.string,
};

export default SummaryDivider;
