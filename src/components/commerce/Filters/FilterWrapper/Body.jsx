import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * Render the FilterWrapperBody component.
 *
 * @return {Element} The FilterWrapperBody component.
 */
const FilterWrapperBody = ({ className, children, ...props }) => (
	<div className={clsx('pt-6 px-px', className)} {...props}>
		{children}
	</div>
);

/**
 * Default Props.
 */
FilterWrapperBody.defaultProps = {
	children: '',
	className: '',
};

/**
 * Prop Types.
 */
FilterWrapperBody.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

export default FilterWrapperBody;
