import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineDollarCircle } from 'react-icons/ai';

/**
 * Render the DollarCircle icon.
 *
 * @return {Element} The DollarCircle icon.
 */
const DollarCircle = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineDollarCircle />
	</span>
);

/**
 * Default Props.
 */
DollarCircle.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
DollarCircle.propTypes = {
	className: PropTypes.string,
};

export default DollarCircle;
