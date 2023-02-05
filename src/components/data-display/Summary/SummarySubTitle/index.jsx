import PropTypes from 'prop-types';
import { clsx } from 'clsx';

/**
 * Render the SummarySubTitle component.
 *
 * @return {Element} The SummarySubTitle component.
 */
const SummarySubTitle = ({ children, className, ...props }) => (
	<h2 className={clsx('text-base font-semibold leading-normal mb-5', className)} {...props}>
		{children}
	</h2>
);

/**
 * Default Props.
 */
SummarySubTitle.defaultProps = {
	children: '',
	className: '',
};

/**
 * Prop Types.
 */
SummarySubTitle.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

export default SummarySubTitle;
