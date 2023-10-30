import PropTypes from 'prop-types';
import clsx from 'clsx';
import FilterWrapperTitle from './Title';
import FilterWrapperBody from './Body';

/**
 * Render the FilterWrapper component.
 *
 * @return {Element} The FilterWrapper component.
 */
const FilterWrapper = ({ hasDivider, className, children, ...props }) => (
	<div className={clsx('pb-6', hasDivider && 'border-b border-neutral-100', className)} {...props}>
		{children}
	</div>
);

/**
 * Sub Components
 */
FilterWrapper.Title = FilterWrapperTitle;
FilterWrapper.Body = FilterWrapperBody;

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
	hasDivider: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
};

export default FilterWrapper;
