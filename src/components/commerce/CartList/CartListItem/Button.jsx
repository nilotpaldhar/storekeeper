import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * Render the Button component.
 *
 * @return {Element} The Button component.
 */
const Button = ({ children, className, onClick, ...props }) => (
	<button
		type="button"
		onClick={onClick}
		className={clsx('h-full flex-1 md:flex-none outline-none disabled:opacity-50', className)}
		{...props}
	>
		<span className="text-xs md:text-sm uppercase font-bold leading-none">{children}</span>
	</button>
);

/**
 * Default Props.
 */
Button.defaultProps = {
	children: '',
	className: '',
	onClick: () => {},
};

/**
 * Prop Types.
 */
Button.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	onClick: PropTypes.func,
};

export default Button;
