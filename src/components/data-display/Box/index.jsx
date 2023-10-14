import PropTypes from 'prop-types';
import { clsx } from 'clsx';

/** Components. */
import BoxTitle from '@ui/data-display/Box/BoxTitle';
import BoxBlock from '@ui/data-display/Box/BoxBlock';
import BoxDivider from '@ui/data-display/Box/BoxDivider';

/**
 * Render the Box component.
 *
 * @return {Element} The Box component.
 */
const Box = ({ as: Component, children, className, ...props }) => (
	<Component className={clsx('border border-dashed border-neutral-200', className)} {...props}>
		{children}
	</Component>
);

/**
 * Sub-Components.
 */
Box.Title = BoxTitle;
Box.Block = BoxBlock;
Box.Divider = BoxDivider;

/**
 * Default Props.
 */
Box.defaultProps = {
	as: 'div',
	children: '',
	className: '',
};

/**
 * Prop Types.
 */
Box.propTypes = {
	as: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
};

export default Box;
