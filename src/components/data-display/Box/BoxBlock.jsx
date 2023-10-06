import PropTypes from 'prop-types';
import { clsx } from 'clsx';

/**
 * Render the BoxBlock component.
 *
 * @return {Element} The BoxBlock component.
 */
const BoxBlock = ({ as: Component, children, className, ...props }) => (
	<Component className={clsx('p-5 to-current', className)} {...props}>
		{children}
	</Component>
);

/**
 * Default Props.
 */
BoxBlock.defaultProps = {
	as: 'div',
	children: '',
	className: '',
};

/**
 * Prop Types.
 */
BoxBlock.propTypes = {
	as: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
};

export default BoxBlock;
