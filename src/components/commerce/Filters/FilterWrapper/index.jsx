import PropTypes from 'prop-types';
import clsx from 'clsx';

/** Icons. */

/**
 * Render the FilterWrapper component.
 *
 * @return {Element} The FilterWrapper component.
 */
const FilterWrapper = ({ title, hasDivider, className, children, ...props }) => (
	<div className={clsx('pb-6', hasDivider && 'border-b border-neutral-100', className)} {...props}>
		<h3 className="block font-semibold text-lg leading-snug">{title}</h3>
		<div className="pt-6 px-px">{children}</div>
	</div>
);

/**
 * Default Props.
 */
FilterWrapper.defaultProps = {
	hasDivider: true,
	children: '',
	className: '',
};

/**
 * Prop Types.
 */
FilterWrapper.propTypes = {
	title: PropTypes.string.isRequired,
	hasDivider: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
};

export default FilterWrapper;
