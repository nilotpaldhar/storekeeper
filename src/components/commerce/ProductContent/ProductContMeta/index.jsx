import PropTypes from 'prop-types';
import { clsx } from 'clsx';

/**
 * Render the ProductContMeta component.
 *
 * @return {Element} The ProductContMeta component.
 */
const ProductContMeta = ({ title, children, className, ...props }) => (
	<div
		className={clsx(
			'flex flex-wrap items-center space-x-2 text-sm font-light leading-normal',
			className
		)}
		{...props}
	>
		{title && <div className="font-semibold">{title}</div>}
		{children}
	</div>
);

/**
 * Default Props.
 */
ProductContMeta.defaultProps = {
	title: '',
	children: '',
	className: '',
};

/**
 * Prop Types.
 */
ProductContMeta.propTypes = {
	title: PropTypes.node,
	children: PropTypes.node,
	className: PropTypes.string,
};

export default ProductContMeta;
