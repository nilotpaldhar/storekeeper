import PropTypes from 'prop-types';
import { clsx } from 'clsx';

/**
 * Render the SummaryList component.
 *
 * @return {Element} The SummaryList component.
 */
const SummaryList = ({ children, className, ...props }) => (
	<ul className={clsx('flex flex-col space-y-4', className)} {...props}>
		{children}
	</ul>
);

/**
 * Default Props.
 */
SummaryList.defaultProps = {
	children: '',
	className: '',
};

/**
 * Prop Types.
 */
SummaryList.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

export default SummaryList;
