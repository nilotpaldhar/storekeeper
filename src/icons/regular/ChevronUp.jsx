import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineUp } from 'react-icons/ai';

/**
 * Render the ChevronUp icon.
 *
 * @return {Element} The ChevronUp icon.
 */
const ChevronUp = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineUp />
	</span>
);

/**
 * Default Props.
 */
ChevronUp.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
ChevronUp.propTypes = {
	className: PropTypes.string,
};

export default ChevronUp;
