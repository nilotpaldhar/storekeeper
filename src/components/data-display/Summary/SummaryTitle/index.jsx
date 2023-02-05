import PropTypes from 'prop-types';
import { clsx } from 'clsx';

/**
 * Render the SummaryTitle component.
 *
 * @return {Element} The SummaryTitle component.
 */
const SummaryTitle = ({ children, className, ...props }) => (
	<h1
		className={clsx(
			'text-base font-medium uppercase leading-tight pb-4 mb-8 border-b border-neutral-50',
			className
		)}
		{...props}
	>
		{children}
	</h1>
);

/**
 * Default Props.
 */
SummaryTitle.defaultProps = {
	children: '',
	className: '',
};

/**
 * Prop Types.
 */
SummaryTitle.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

export default SummaryTitle;
