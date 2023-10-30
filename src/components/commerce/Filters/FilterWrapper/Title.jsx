import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * Render the FilterWrapperTitle component.
 *
 * @return {Element} The FilterWrapper component.
 */
const FilterWrapperTitle = ({ as: Component, className, children, ...props }) => (
	<Component className={clsx('block font-semibold text-base leading-snug', className)} {...props}>
		{children}
	</Component>
);

/**
 * Default Props.
 */
FilterWrapperTitle.defaultProps = {
	as: 'h3',
	className: '',
	children: '',
};

/**
 * Prop Types.
 */
FilterWrapperTitle.propTypes = {
	as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
	children: PropTypes.node,
	className: PropTypes.string,
};

export default FilterWrapperTitle;
